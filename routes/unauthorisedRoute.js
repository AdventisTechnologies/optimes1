const express = require('express');
const UnauthorizedEntryController = require('../controllers/unauthorisedcontroller');
const router = express.Router();

// Route to handle unauthorized entry data storage
router.post('/unauthorizedentry', async (req, res) => {
  try {
    const entryData = req.body;
    await UnauthorizedEntryController.storeUnauthorizedEntry(entryData);
    res.status(200).send('Unauthorized entry stored successfully.');
  } catch (error) {
    console.error('Error storing unauthorized entry:', error);
    res.status(500).send('Error processing unauthorized entry.');
  }
});
router.get('/unauthoriseddata', UnauthorizedEntryController.getunauthorisedData);
module.exports = router;
