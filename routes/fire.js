// routes/cameraRoutes.js
const express = require('express');
const cameraController = require('../controllers/fireController');
const router = express.Router();

// Save a new frame
router.post('/', cameraController.saveFrame);
router.get('/fireframes', cameraController.getAllFireFrames);


// Get frames for a specific camera

module.exports = router;
