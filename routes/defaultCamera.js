// routes/cameraRouter.js
const express = require('express');
const router = express.Router();
const cameraController = require('../controllers/defaultCameraController');

// Route to log failed camera stream
router.post('/logFailedStream', cameraController.logFailedCameraStream);



module.exports = router;
