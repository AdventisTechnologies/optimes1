// routes/cameraRoutes.js
const express = require('express');
const cameraController = require('../Controller/fireController');
const router = express.Router();

// Save a new frame
router.post('/', cameraController.saveFrame);
// router.get('/get', cameraController.getAallfireEx);


// Get frames for a specific camera

module.exports = router;
