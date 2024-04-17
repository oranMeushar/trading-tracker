const express = require('express');
const router = express.Router();
const tradesController = require('../controllers/tradesController');
const fileUpload = require('express-fileupload');
const protected = require('../middleware/protected');

router.post('/', protected, fileUpload(), tradesController.newTrade);
router.get('/', protected, tradesController.getTrades);
router.post('/initial',protected,  tradesController.initialNet);
router.get('/initial',protected,  tradesController.getInitialNet);
router.get('/cards', protected, tradesController.getCardsData);
router.get('/stats', protected, tradesController.getStatsData);
router.get('/:id', protected, tradesController.getTradeById);
router.delete('/:id', protected, tradesController.deleteTradeById);
// router.get('/logs', protected, tradesController.getTrades);


module.exports = router;