const Service = require('../models/service.model');

class ServiceRepository {
    async findAll() {
        return Service.find();
    }
    async findById(id) {
        return Service.findById(id);
    }
    async create(data) {
        return Service.create(data);
    }
    async update(id, data) {
        return Service.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return Service.findByIdAndDelete(id);
    }
}

module.exports = new ServiceRepository();
