const express = require('express');
const router = express.Router();
const { authenticate } = require('./controller');

router.post('/', async (req, res) => {
    const result = await authenticate(req.body);
    if(result) {
        return res.json({
            token: result
        });
    }
    return res.sendStatus(401);
});

module.exports = router