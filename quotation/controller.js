const db = require('../db');

module.exports.getQuotations = async (supplierId) => {
    const quotations = await db.query(
        `
            SELECT * FROM cotizacion WHERE id IN (
                SELECT cotizacionid FROM coti_producto WHERE productoid IN (
                    SELECT productoid FROM prov_producto WHERE proveedorid = ?
                )
            )
        `,
        [supplierId]
    );

    for(let i in quotations){
        const products = await db.query(
            `
                SELECT prod.*, coti.cantidad 
                FROM producto prod JOIN coti_producto coti ON coti.productoid = prod.id 
                WHERE coti.cotizacionid = ?
            `,
            [quotations[i].id]
        );
        quotations[i].productos = products;
    }

    return quotations;
}