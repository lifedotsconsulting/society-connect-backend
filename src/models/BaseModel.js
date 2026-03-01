/**
 * Base Model representing common properties for all entities
 */
class BaseModel {
    constructor(data = {}) {
        // Identity field (often mapped to _id or id in databases)
        this.identity = data.identity || null;
        
        // General description field
        this.description = data.description || '';
        
        // Audit fields
        this.createdAt = data.createdAt || new Date();
        this.createdBy = data.createdBy || null; // Could be a user identity
        this.updatedAt = data.updatedAt || new Date();
        this.updatedBy = data.updatedBy || null; // Could be a user identity
        this.isActive = data.isActive !== undefined ? data.isActive : true; // Default to true
    }

    /**
     * Updates audit fields before saving/updating
     * @param {string} userId - ID of the user performing the action
     */
    updateAudit(userId = null) {
        this.updatedAt = new Date();
        if (userId) {
            this.updatedBy = userId;
        }
    }

    /**
     * Soft deletes the record
     * @param {string} userId - ID of the user performing the deletion
     */
    softDelete(userId = null) {
        this.isActive = false;
        this.updateAudit(userId);
    }
}

module.exports = BaseModel;
