const express = require('express');
const router = express.Router();
const { storeFoodHistory, getFoodHistory } = require('../controllers/FoodHistory.js');
const { upload } = require('../middleware/MulterConfig.js');

router.post('/food-history', upload, storeFoodHistory);
router.get('/food-history/:userId', getFoodHistory);

module.exports = router;