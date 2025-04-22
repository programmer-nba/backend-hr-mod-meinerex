const express = require('express');
const router = express.Router();
const salary = require('../../controllers/Salary/salaryController');

router.post('/salary/post', salary.create);

//router.get('/salary/get', salary.getAll);


module.exports = router;
