const db = require('../db');

getProposalByQuotation = async (quotationId, supplierId) => {
    const proposals = await db.query(
        'SELECT * FROM propuesta WHERE cotizacionid = ? AND proveedorid = ?',
        [quotationId, supplierId]
    );
    if(proposals.length === 0) return null;
    return proposals[0];
}

module.exports = {
    getProposalByQuotation : getProposalByQuotation,
    getProposalById : async (proposalId, supplierId) => {
        const proposals = await db.query(
            'SELECT * FROM propuesta WHERE id = ? AND proveedorid = ?',
            [proposalId, supplierId]
        );
        if(proposals.length === 0) return null;
        proposals[0].productos = await db.query(
            `
                SELECT prod.*, prop.cantidad, prop.valor_unitario
                FROM producto prod JOIN prop_producto prop ON prop.productoid = prod.id
                WHERE prop.propuestaid = ?
            `,
            [proposals[0].id]
        );
        
        return proposals[0];
    },

    createProposal: async (quotationId, proposal, supplierId) => {
        const proposalModel = await this.getProposalByQuotation(quotationId, supplierId);
        if(proposalModel) return null;

        
    }
}