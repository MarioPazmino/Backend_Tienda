const serviceRepository = require('../repositories/service.repository');

class ServiceService {
    async getAllServices() {
        return serviceRepository.findAll();
    }
    async getServiceById(id) {
        return serviceRepository.findById(id);
    }
    async createService(data) {
        return serviceRepository.create(data);
    }
    async updateService(id, data) {
        return serviceRepository.update(id, data);
    }
    async deleteService(id) {
        return serviceRepository.delete(id);
    }
}

module.exports = new ServiceService();
