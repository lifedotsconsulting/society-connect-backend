const BaseModel = require('./BaseModel');

class RolePermission extends BaseModel {
    constructor(data = {}) {
        super(data);
        // Note: RolePermissions schema uses id SMALLINT, role_id VARCHAR, module BOOLEAN (?), permission VARCHAR
        this.roleId = data.roleId || data.role_id || '';
        this.module = data.module !== undefined ? data.module : false;
        this.permission = data.permission || '';
    }
}

module.exports = RolePermission;
