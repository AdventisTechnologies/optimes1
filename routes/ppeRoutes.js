const express = require('express');
const router = express.Router();
const ppeController = require('../controllers/ppeController');
router.post('/ppe', ppeController.addPPEKit);
router.get('/getppeKits', ppeController.getAllPPEKits);


module.exports = router;
