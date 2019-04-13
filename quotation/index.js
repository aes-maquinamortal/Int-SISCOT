const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({x: 1});
});

module.exports = router