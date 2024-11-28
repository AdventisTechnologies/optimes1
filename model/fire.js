// models/fire.model.js
const mongoose = require('mongoose');

const FireSchema = new mongoose.Schema({
  cameraId: { type: mongoose.Schema.Types.ObjectId, ref: 'CameraData', required: true },
  frames: [{
    timestamp: { type: Date, default: Date.now },
    label: { type: String, required: true },
    personCount: { type: String, required: true },
    confidence: { type: Number, required: true },
    image: { type: String, required: true }, // Stores the frame image as a binary buffer
    scenario: { type: String, required: true },

  }]
});

module.exports = mongoose.model('Fire', FireSchema);
