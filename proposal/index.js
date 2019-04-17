const express = require('express');
const router = express.Router();
const proposalController = require('./controller');
const { authMiddleware } = require('../auth/controller');

router.use(authMiddleware);

router.get('/:id', async (req, res) => {
    const proposal = await proposalController.getProposalById(req.params.id, req.supplierId);
    if(!proposal) return res.sendStatus(404);
    return res.json(proposal);
});

module.exports = router