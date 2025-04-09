const express = require('express');
const router = express.Router();
const Record = require('../../controllers/record_report/record.controller');

router.post('/record/post', Record.create);

router.get('/record/post', Record.getAll);

router.get('/record/post/:id', Record.getByUserId);

module.exports = router;