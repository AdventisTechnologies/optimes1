const mongoose = require('mongoose');

// Schema for unauthorized entry data
const UnauthorizedEntrySchema = new mongoose.Schema({
  employee_id: { type: String, required: true },
  scenario: { type: String, default: "unauthorized entry", required: true },
  location_id: { type: String, required: true },
  location_name: { type: String, required: true },
  start_timestamp: { type: Date, required: true },
  duration: { // New field for duration
    seconds: { type: Number, required: true },
    minutes: { type: Number, required: true },
    hours: { type: Number, required: true }
  },
  frame: { type: String, required: true } // Base64 encoded image frame
});

const UnauthorizedEntry = mongoose.model('UnauthorizedEntry', UnauthorizedEntrySchema);

module.exports = UnauthorizedEntry;
