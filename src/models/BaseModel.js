/**
 * Base Model representing common properties for all entities
 */
class BaseModel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.createdAt = data.createdAt || data.created_at || new Date();
        this.createdBy = data.createdBy || data.created_by || null;
        this.updatedAt = data.updatedAt || data.updated_at || null;
        this.updatedBy = data.updatedBy || data.updated_by || null;
        this.description = data.description || '';
    }

    updateAudit(userId = null) {
        this.updatedAt = new Date();
        if (userId) {
            this.updatedBy = userId;
        }
    }
}

module.exports = BaseModel;
