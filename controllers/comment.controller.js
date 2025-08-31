const commentService = require('../services/comment.service');

exports.create = async (req, res, next) => {
  try {
    const comment = await commentService.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

exports.getByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await commentService.getByProduct(productId, page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
