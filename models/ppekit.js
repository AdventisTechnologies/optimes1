const mongoose = require('mongoose');

const PPEKitSchema = new mongoose.Schema({
    personName: { type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeData', required: false },
    image: { type: String, required: true },
    hardhat: { type: Boolean, required: true },
    mask: { type: Boolean, required: true },
    safetyVest: { type: Boolean, required: true },
    safetyBoot: { type: Boolean, required: true },  // Add safetyBoot field
    glass: { type: Boolean, required: true },       // Add glass field
    missingFrom: { type: Date, default: null }, // Time when PPE was missing
    missingTo: { type: Date, default: null },   // Time when PPE was worn again
    createdAt: { type: Date, default: Date.now }, // Add createdAt for each status change
    camera: { type: mongoose.Schema.Types.ObjectId, ref: 'CameraData', required: true }, // Reference to Camera model

    statusChanges: [
        {
            hardhat: { type: Boolean, required: true },
            mask: { type: Boolean, required: true },
            safetyVest: { type: Boolean, required: true },
            safetyBoot: { type: Boolean, required: false },  // Add safetyBoot to status changes
            glass: { type: Boolean, required: false },       // Add glass to status changes
            missingFrom: { type: Date, default: null },
            missingTo: { type: Date, default: null },
            image: { type: String, required: true },
            camera: { type: mongoose.Schema.Types.ObjectId, ref: 'CameraData', required: true }, // Reference to Camera model
        }
    ]  // Store all status changes with timestamps
});

const PPEKit = mongoose.model('PPEKit', PPEKitSchema);
module.exports = PPEKit;
