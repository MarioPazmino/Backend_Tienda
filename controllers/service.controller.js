const serviceService = require('../services/service.service');

exports.getAll = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const service = await serviceService.getServiceById(req.params.id);
        if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newService = await serviceService.createService(req.body);
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedService = await serviceService.updateService(req.params.id, req.body);
        if (!updatedService) return res.status(404).json({ error: 'Servicio no encontrado' });
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedService = await serviceService.deleteService(req.params.id);
        if (!deletedService) return res.status(404).json({ error: 'Servicio no encontrado' });
        res.json({ message: 'Servicio eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
