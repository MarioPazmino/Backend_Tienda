const adminRepository = require('../repositories/admin.repository');

class AdminService {
    async register(data) {
        return adminRepository.create(data);
    }
    async login(username, password) {
        const admin = await adminRepository.findByUsername(username);
        if (!admin) return null;
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return null;
        return admin;
    }
    async findById(id) {
        return adminRepository.findById(id);
    }

    async changePassword(id, newPassword) {
        return adminRepository.updatePassword(id, newPassword);
    }
}

module.exports = new AdminService();
