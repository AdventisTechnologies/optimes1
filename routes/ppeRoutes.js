const express = require('express');
const router = express.Router();
const ppeController = require('../controllers/ppeController');

router.post('/', ppeController.addPPEKit);
router.get('/', ppeController.getAllPPEKits);


module.exports = router;
