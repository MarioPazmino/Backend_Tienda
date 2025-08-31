const Admin = require('../models/admin.model');

class AdminRepository {
    async create(data) {
        return Admin.create(data);
    }
    async findByUsername(username) {
        return Admin.findOne({ username });
    }
    async findById(id) {
        return Admin.findById(id);
    }
}

module.exports = new AdminRepository();
