const express = require('express');
const router = express.Router();
const corporation = require('../controllers/corporation.controller');

router.post('/corporation/post', corporation.create);

router.get('/corporation/get', corporation.getAll);

// router.get('/corporation/get/:id', corporation.getByUserId);

module.exports = router;
// corporation