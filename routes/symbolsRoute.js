const express = require('express');
const router = express.Router();
const symbolController = require('../controllers/symbolsController');
const protected = require('../middleware/protected');
router.get('/', protected, symbolController.getAllSymbols);
module.exports = router;