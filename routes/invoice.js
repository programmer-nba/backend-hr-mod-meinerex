module.exports = router;

const express = require('express');
const router = express.Router();
const invoice = require('../controllers/invoice.controller');

// Get all users
router.get('/', invoice.getInvoice);

router.post('/', invoice.createInvoice)

module.exports = router;