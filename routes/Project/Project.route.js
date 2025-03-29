const express = require('express')
const router = express.Router();
const ProjectController = require('../../controllers/project/Project.controller')

//Auth
const auth = require("../../lib/auth");
const authAdmin = require("../../lib/authAdmin");


//ใบแจ้งหนี้
router.post('/invoice', ProjectController.createProject);

router.get('/', ProjectController.getProjects);

router.get('/:id', ProjectController.getProject);

router.post('/', ProjectController.createProject);

router.post('/upload/:id', ProjectController.uploadWorkImages);

router.put('/:id/update', ProjectController.updateProject);
router.put('/:id/submit', ProjectController.acceptProject);

router.put('/:id/update-office', ProjectController.updateProjectOffice);
router.put('/:id/accept-office', ProjectController.acceptProjectOffice);

router.delete('/:id', ProjectController.deleteProject);

router.post('/shop', ProjectController.createProjectShop);
router.put('/shop/cancel', ProjectController.cancelProjectShop)

//router.put('/accept/:id', auth, ProjectController.Accept);

//router.put('/finish/:id', auth, ProjectController.Finish);


module.exports = router;