const cron = require('node-cron');
const { getAallfireEx } = require('../Controller/fireController'); // Adjust the path accordingly

// Schedule the task to run every 10 minutes
// cron.schedule('*/2 * * * *', async () => {
cron.schedule('0 6 * * *', async () => {
  try {
    console.log('Triggering Fire Extinguisher Check...');
    await getAallfireEx(); // Call the function to fetch and process the data
  } catch (error) {
    console.error('Error during scheduled task:', error);
  }
});
