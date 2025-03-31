const express = require('express');
const router = express.Router();
const depositController = require('../controllers/deposit.controller');

router.post('/ddsc-office/deposit', depositController.createDeposit);

module.exports = router;