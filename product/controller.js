const db = require('../db');

module.exports.createProduct = async (product, supplierId) => {
    let productId = await _getProduct(product.referencia);
    try {
        if(productId === -1) {
            const productModel = await db.query(
                'INSERT INTO producto (nombre, referencia, url) VALUES (?, ?, ?)',
                [product.nombre, product.referencia, product.url]
            );
            productId = productModel.insertId;
        }

        await db.query(
            'INSERT INTO prov_producto (proveedorid, productoid) VALUES (?, ?)',
            [supplierId, productId]
        );
    } catch (error) {
        return error.message
    }
}

_getProduct = async (referencia) => {
    const productModel = await db.query(
        'SELECT id FROM producto WHERE referencia = ?',
        [referencia]
    )
    return productModel.length === 0 ? -1 : productModel[0].id
}