const express = require('express');
const router = express.Router();
const ExamResultsController = require('../../controllers/Exam/ExamResults.controller')

const authUser = require("../../auten")

//Get ExamResults
router.get('/', ExamResultsController.getExamResults);


//Get ExamResults By Id
router.get('/byid/:id',authUser.user, ExamResultsController.getExamResultsById);

router.get('/get/byid/:id',authUser.user, ExamResultsController.getExamResultsByIdAll);

//Insert ExamResults
router.post('/insert-examresults', authUser.user, ExamResultsController.InsertExamResults);


//Update ExamResults
router.put('/update-examresults/:id', authUser.user, ExamResultsController.UpdateExamResults);


router.put('/update-examresults/userid/:id', authUser.user, ExamResultsController.UpdateExamResultsByID);


//Delete ExamResults
router.delete('/delete-examsults/:id', ExamResultsController.DeleteExamResults);


module.exports = router;
