const express = require('express');
const restrictController = require('../controllers/restrictcontroller'); // Adjust the path as necessary

const router = express.Router();

// POST route to add detection data
router.post('/', restrictController.occupancyData);
// GET route to fetch all occupancy data
router.get('/restrictroutedata', restrictController.getOccupancyData);



module.exports = router;