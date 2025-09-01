
const Admin = require('../models/admin.model');

class AdminRepository {
    async setActive(id, activo) {
        return Admin.findByIdAndUpdate(id, { activo }, { new: true });
    }
    async delete(id) {
        return Admin.findByIdAndDelete(id);
    }
    async create(data) {
        return Admin.create(data);
    }
    async findByUsername(username) {
        return Admin.findOne({ username });
    }
    async findById(id) {
        return Admin.findById(id);
    }

    async updatePassword(id, newPassword) {
        const admin = await Admin.findById(id);
        if (!admin) return null;
        admin.password = newPassword;
        await admin.save();
        return admin;
    }
}

module.exports = new AdminRepository();
