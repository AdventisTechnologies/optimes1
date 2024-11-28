const express = require('express');
const router = express.Router();
const ppeController = require('../Controller/ppeController');

router.post('/', ppeController.addPPEKit);
router.get('/', ppeController.getAllPPEKits);


module.exports = router;
