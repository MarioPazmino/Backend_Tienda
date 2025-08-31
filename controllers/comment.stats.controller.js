const commentStatsService = require('../services/comment.stats.service');

exports.getStatsByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const stats = await commentStatsService.getStatsByProduct(productId);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
