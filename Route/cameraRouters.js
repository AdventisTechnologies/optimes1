// routes/camera.routes.js

const express = require('express');
const cameraController = require('../Controller/cameraController');

const router = express.Router();

router.post('/', cameraController.addCamera);
router.get('/all', cameraController.getAllCameras);
router.get('/:id', cameraController.getCameraById);
router.put('/update/:id', cameraController.updateCamera);
router.delete('/delete/:id', cameraController.deleteCamera);

module.exports = router;
