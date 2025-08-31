const clickService = require('../services/click.service');


exports.registerClick = async (req, res) => {
    try {
        const data = {
            productId: req.body.productId
        };
        const click = await clickService.registerClick(data);
        res.status(201).json(click);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const stats = await clickService.getStats(req.query);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.countByProduct = async (req, res) => {
    try {
        const stats = await clickService.countByProduct();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Eliminado countByService porque ya no hay clicks por servicio
