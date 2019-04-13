const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../auth/controller');
const productController = require('./controller');

router.use(authMiddleware);

router.post('/', async (req, res) => {
    const result = await productController.createProduct(req.body, req.supplierId);
    if(!result) return res.sendStatus(201);
    res.status(500)
    return res.json({ error: result });
});

module.exports = router