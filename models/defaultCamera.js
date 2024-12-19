const mongoose = require('mongoose');

const cameraLogSchema = new mongoose.Schema({
    camera_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CameraData', required: true},
    errorMessage: { type: String, required: true },
   
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CameraLog', cameraLogSchema);
