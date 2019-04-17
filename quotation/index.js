const express = require('express');
const router = express.Router();
const quotationController = require('./controller');
const proposalController = require('../proposal/controller');
const { authMiddleware } = require('../auth/controller');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    const quotations = await quotationController.getQuotations(req.supplierId);
    return res.json(quotations);
});

router.get('/:id/proposal', async (req, res) => {
    const proposal = await proposalController.getProposalByQuotation(req.params.id, req.supplierId);
    if(!proposal) return res.sendStatus(204);
    return res.json(proposal);
});

router.post('/:id/proposal', async (req, res) => {
    const proposal = await proposalController.createProposal(req.params.id, req.body, req.supplierId);
    if(!proposal) return res.sendStatus(409);
    return res.json(proposal);
});

module.exports = router