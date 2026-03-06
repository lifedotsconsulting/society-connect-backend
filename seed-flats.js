require('dotenv').config();
const db = require('./src/services/db.service');
const HashService = require('./src/services/hash.service');
const crypto = require('crypto');

const owners = {
    "A101": "Nagpure",
    "A102": "Bhosale",
    "A103": "Raje",
    "A104": "Gayalkar",
    "A201": "Ganbavale",
    "A202": "Agashe",
    "A203": "Dawakhare",
    "A204": "Dhokale",
    "A301": "Haldule",
    "A302": "Hendre",
    "A303": "Kothawale",
    "A304": "Pandit",
    "A401": "Tambe",
    "A402": "Javalkar",
    "A403": "Billad",
    "A404": "Patil",
    "B101": "Borhade",
    "B102": "Kulkarni",
    "B103": "Kagade",
    "B104": "Supekar",
    "B201": "Brijesh",
    "B202": "Parge",
    "B203": "Pathal",
    "B204": "Vithvekar",
    "B301": "Bhojane",
    "B302": "Kulkarni",
    "B303": "Patki",
    "B304": "Kolpe",
    "B401": "Dere",
    "B402": "Shirke",
    "B403": "Shende",
    "B503": "Khadpkar"
};

async function seed() {
    try {
        console.log('Starting DB Seeding...');
        // Default password for all seeded users: 'password123'
        const defaultPasswordHash = HashService.md5('password123');

        for (let floor = 1; floor <= 5; floor++) {
            for (const wing of ['A', 'B']) {
                let maxFlats = 4;
                if (wing === 'A' && floor === 5) {
                    maxFlats = 5; // A505 requested explicitly
                }

                for (let i = 1; i <= maxFlats; i++) {
                    // formats to string like '101'
                    const flatNumDigits = (floor * 100) + i;
                    const flatNumber = `${wing}${flatNumDigits}`;

                    // Check if flat exists already
                    const existing = await db.query('SELECT identity FROM Flats WHERE flatNumber = ?', [flatNumber]);
                    if (existing.length > 0) {
                        console.log(`Flat ${flatNumber} already exists. Skipping...`);
                        continue;
                    }

                    const flatIdentity = crypto.randomUUID();
                    let ownerIdentity = null;

                    const ownerName = owners[flatNumber];
                    if (ownerName) {
                        // Create user first
                        ownerIdentity = crypto.randomUUID();
                        await db.query(`
                            INSERT INTO Users (identity, flatNumber, name, role, passwordHash, isActive)
                            VALUES (?, ?, ?, ?, ?, ?)
                        `, [ownerIdentity, flatNumber, ownerName, 'FlatOwner', defaultPasswordHash, true]);
                        console.log(`-> Created User: ${ownerName} for ${flatNumber}`);
                    }

                    // Create flat
                    await db.query(`
                        INSERT INTO Flats (identity, flatNumber, block, floor, bhk, occupancyStatus, currentResidentId, ownerId, isActive)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `, [
                        flatIdentity,
                        flatNumber,
                        wing,
                        floor,
                        '2BHK',
                        ownerIdentity ? 'Owner' : 'Vacant', // Occupancy Status
                        ownerIdentity, // currentResidentId
                        ownerIdentity, // ownerId
                        true
                    ]);

                    console.log(`-> Created Flat: ${flatNumber}`);
                }
            }
        }
        console.log('✅ Seeding completed successfully!');
    } catch (e) {
        console.error('❌ Error during seeding:', e);
    } finally {
        process.exit();
    }
}

seed();
