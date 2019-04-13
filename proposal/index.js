const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({x: 1});
});

module.exports = router