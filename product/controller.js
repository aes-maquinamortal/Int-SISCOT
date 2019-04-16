const db = require('../db');

module.exports.createProduct = async (product, supplierId) => {
    let productId = await _getProductId(product.referencia);
    try {
        if(productId === -1) {
            const productModel = await db.query(
                'INSERT INTO producto (nombre, referencia, url) VALUES (?, ?, ?)',
                [product.nombre, product.referencia, product.url]
            );
            productId = productModel.insertId;
        }

        const provProductModel = await db.query(
            'SELECT id FROM prov_producto WHERE proveedorid = ? AND productoid = ?',
            [supplierId, productId]
        );

        if(provProductModel.length === 0){
            await db.query(
                'INSERT INTO prov_producto (proveedorid, productoid) VALUES (?, ?)',
                [supplierId, productId]
            );
        }

    } catch (error) {
        return error.message
    }
}

_getProductId = async (referencia) => {
    const productModel = await db.query(
        'SELECT id FROM producto WHERE referencia = ?',
        [referencia]
    )
    return productModel.length === 0 ? -1 : productModel[0].id
}