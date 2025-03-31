

const express = require('express');
const router = express.Router();
const depositController = require('../../controllers/deposit.controller');

router.post('/deposit', depositController.createDeposit);

module.exports = router;
