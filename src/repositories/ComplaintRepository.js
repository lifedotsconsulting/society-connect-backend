const db = require('../services/db.service');
const Complaint = require('../models/Complaint');

const QUERIES = {
    FIND_ALL: 'SELECT * FROM Complaints WHERE isActive = 1',
    FIND_BY_ID: 'SELECT * FROM Complaints WHERE identity = ? AND isActive = 1',
    CREATE: 'INSERT INTO Complaints (identity, description, createdAt, createdBy, updatedAt, updatedBy, isActive, title, category, status, priority, raisedByUserId, raisedForFlat, assignedTo, resolutionNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE: 'UPDATE Complaints SET description = ?, updatedAt = ?, updatedBy = ?, title = ?, category = ?, status = ?, priority = ?, assignedTo = ?, resolutionNotes = ? WHERE identity = ?',
    DELETE: 'UPDATE Complaints SET isActive = 0, updatedAt = ?, updatedBy = ? WHERE identity = ?'
};

class ComplaintRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];

        if (filters.status) {
            query += ' AND status = ?';
            params.push(filters.status);
        }
        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }
        if (filters.priority) {
            query += ' AND priority = ?';
            params.push(filters.priority);
        }
        if (filters.raisedByUserId) {
            query += ' AND raisedByUserId = ?';
            params.push(filters.raisedByUserId);
        }

        const results = await db.query(query, params);
        return results.map(row => new Complaint(row));
    }

    async findById(identity) {
        const results = await db.query(QUERIES.FIND_BY_ID, [identity]);
        return results.length ? new Complaint(results[0]) : null;
    }

    async create(complaintData) {
        const complaint = new Complaint(complaintData);
        if (!complaint.identity) {
            complaint.identity = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            complaint.identity, complaint.description, complaint.createdAt, complaint.createdBy, complaint.updatedAt, complaint.updatedBy, complaint.isActive ? 1 : 0,
            complaint.title, complaint.category, complaint.status, complaint.priority, complaint.raisedByUserId, complaint.raisedForFlat, complaint.assignedTo, complaint.resolutionNotes
        ]);
        return complaint;
    }

    async update(identity, updateData, userId = null) {
        const complaint = await this.findById(identity);
        if (!complaint) return null;

        const updatedAt = new Date();
        const updatedBy = userId || complaint.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.description !== undefined ? updateData.description : complaint.description,
            updatedAt,
            updatedBy,
            updateData.title !== undefined ? updateData.title : complaint.title,
            updateData.category !== undefined ? updateData.category : complaint.category,
            updateData.status !== undefined ? updateData.status : complaint.status,
            updateData.priority !== undefined ? updateData.priority : complaint.priority,
            updateData.assignedTo !== undefined ? updateData.assignedTo : complaint.assignedTo,
            updateData.resolutionNotes !== undefined ? updateData.resolutionNotes : complaint.resolutionNotes,
            identity
        ]);

        return await this.findById(identity);
    }

    async delete(identity, userId = null) {
        const updatedAt = new Date();
        await db.query(QUERIES.DELETE, [updatedAt, userId, identity]);
        return true;
    }
}

module.exports = new ComplaintRepository();
