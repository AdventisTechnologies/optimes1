// models/camera.model.js

const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
    cameraId: {
        type: String,
        required: true,
        unique: true
    },
    cameraUsername: {
        type: String,
        required: true
    },
    cameraPassword: {
        type: String,
        required: true
    },
    cameraIp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Camera', cameraSchema);
