/**
 * A generic Data Access Object (DAO) providing standard CRUD operations.
 * Currently using an in-memory array to simulate a database.
 * This can be easily replaced with MongoDB/Mongoose or PostgreSQL/Sequelize calls later.
 */
class BaseDao {
    constructor(modelClass) {
        this.modelClass = modelClass;
        // Simulating a database table/collection
        this.collection = [];
    }

    /**
     * Finds all records matching a query
     * @param {Object} query - Filter object (simple key-value matching simulation)
     * @returns {Array} - Array of model instances
     */
    async findAll(query = {}) {
        let results = this.collection.filter(item => item.isActive !== false);

        // Simple filtering simulation
        if (Object.keys(query).length > 0) {
            results = results.filter(item => {
                for (const key in query) {
                    if (item[key] !== query[key]) return false;
                }
                return true;
            });
        }

        return results;
    }

    /**
     * Finds a single record by its identity
     * @param {string} id - The unique identity
     * @returns {Object|null} - Model instance or null
     */
    async findById(id) {
        const item = this.collection.find(i => i.identity === id && i.isActive !== false);
        return item || null;
    }

    /**
     * Creates a new record
     * @param {Object} data - Data to create the record
     * @returns {Object} - Created model instance
     */
    async create(data) {
        // Generate a simple unique identity if none is provided
        if (!data.identity) {
            data.identity = Math.random().toString(36).substring(2, 10);
        }

        const instance = new this.modelClass(data);
        this.collection.push(instance);
        return instance;
    }

    /**
     * Updates an existing record
     * @param {string} id - The unique identity
     * @param {Object} updateData - Data to update
     * @param {string} userId - ID of user performing action
     * @returns {Object|null} - Updated model instance or null
     */
    async update(id, updateData, userId = null) {
        const index = this.collection.findIndex(i => i.identity === id && i.isActive !== false);
        if (index === -1) return null;

        const currentItem = this.collection[index];

        // Merge updates
        for (const key in updateData) {
            if (key !== 'identity' && key !== 'createdAt') { // Prevent overwriting immutable fields
                currentItem[key] = updateData[key];
            }
        }

        currentItem.updateAudit(userId);
        this.collection[index] = currentItem;
        return currentItem;
    }

    /**
     * Soft deletes a record
     * @param {string} id - The unique identity
     * @param {string} userId - ID of user performing action
     * @returns {boolean} - True if successful, false otherwise
     */
    async delete(id, userId = null) {
        const item = await this.findById(id);
        if (!item) return false;

        item.softDelete(userId);
        return true;
    }
}

module.exports = BaseDao;
