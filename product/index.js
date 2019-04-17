const express = require('express');
const router = express.Router();
const productController = require('./controller');
const { authMiddleware } = require('../auth/controller');

router.use(authMiddleware);

router.post('/', async (req, res) => {
    const result = await productController.createProduct(req.body, req.supplierId);
    if(!result) return res.sendStatus(201);
    res.status(500)
    return res.json({ error: result });
});

router.get('/', async (req, res) => {
    const result = await productController.getProducts(req.supplierId);
    return res.json(result);
});

module.exports = router