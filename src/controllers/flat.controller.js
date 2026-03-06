const { FlatService } = require('../services');
const fs = require('fs');
const csv = require('csv-parser');
const db = require('../services/db.service');
const HashService = require('../services/hash.service');
const crypto = require('crypto');

class FlatController {
    async getAllFlats(req, res) {
        try {
            const flats = await FlatService.getAllFlats(req.query);
            res.status(200).json(flats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFlatById(req, res) {
        try {
            const flat = await FlatService.getFlatById(req.params.id);
            if (!flat) return res.status(404).json({ error: 'Flat not found' });
            res.status(200).json(flat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async uploadFlats(req, res) {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a CSV file' });
        }

        const results = [];
        let createdCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    const defaultPasswordHash = HashService.md5('password123');

                    for (const row of results) {
                        if (!row.flatNumber) continue;

                        try {
                            const flatNumber = row.flatNumber.trim();

                            // Check if flat exists
                            const existing = await db.query('SELECT identity FROM Flats WHERE flatNumber = ?', [flatNumber]);
                            if (existing.length > 0) {
                                skippedCount++;
                                continue;
                            }

                            const flatIdentity = crypto.randomUUID();
                            let ownerIdentity = null;

                            const ownerName = row.ownerName ? row.ownerName.trim() : null;
                            if (ownerName) {
                                ownerIdentity = crypto.randomUUID();
                                await db.query(`
                                    INSERT INTO Users (identity, flatNumber, name, role, email, phone, passwordHash, isActive)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                `, [
                                    ownerIdentity,
                                    flatNumber,
                                    ownerName,
                                    'FlatOwner',
                                    row.ownerEmail || null,
                                    row.ownerPhone || null,
                                    defaultPasswordHash,
                                    true
                                ]);
                            }

                            // Create flat
                            await db.query(`
                                INSERT INTO Flats (identity, flatNumber, block, floor, bhk, occupancyStatus, currentResidentId, ownerId, isActive)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `, [
                                flatIdentity,
                                flatNumber,
                                row.block || null,
                                row.floor ? parseInt(row.floor, 10) : null,
                                row.bhk || '2BHK',
                                ownerIdentity ? 'Owner' : 'Vacant',
                                ownerIdentity,
                                ownerIdentity,
                                true
                            ]);
                            createdCount++;
                        } catch (err) {
                            console.error(`Error processing row ${row.flatNumber}:`, err);
                            errorCount++;
                        }
                    }

                    // Delete the temporary file
                    if (fs.existsSync(req.file.path)) {
                        fs.unlinkSync(req.file.path);
                    }

                    res.status(200).json({
                        message: 'Upload processing completed',
                        stats: {
                            created: createdCount,
                            skipped: skippedCount,
                            errors: errorCount,
                            totalRows: results.length
                        }
                    });
                } catch (error) {
                    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
                    res.status(500).json({ error: 'Failed to process CSV file completely: ' + error.message });
                }
            })
            .on('error', (error) => {
                if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
                res.status(500).json({ error: 'Error parsing CSV: ' + error.message });
            });
    }

    async createFlat(req, res) {
        try {
            const flat = await FlatService.createFlat(req.body);
            res.status(201).json(flat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateFlat(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const flat = await FlatService.updateFlat(req.params.id, req.body, userId);
            if (!flat) return res.status(404).json({ error: 'Flat not found' });
            res.status(200).json(flat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteFlat(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const success = await FlatService.deleteFlat(req.params.id, userId);
            if (!success) return res.status(404).json({ error: 'Flat not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new FlatController();
