const Camera = require('../models/CamereSchema');       // Corrected model name
const cameraLogModel = require('../models/defaultCamera'); // Log model

// Function to log the failed camera stream with camera mapping
exports.logFailedCameraStream = async (req, res) => {
    const { camera_id, errorMessage } = req.body;
    console.log(req.body);

    // Validate input
    if (!camera_id || !errorMessage) {
        return res.status(400).json({ message: 'Missing camera_id or errorMessage' });
    }

    try {
        // Find the camera by camera_id
        const camera = await Camera.findOne({ CameraLocationID: camera_id });
        if (!camera) {
            return res.status(404).json({ message: `Camera with ID ${camera_id} not found.` });
        }

        // Create a log entry with the associated camera data
        const logEntry = new cameraLogModel({ 
            camera_id: camera._id, // Ensure you're using the ObjectId of the camera
            errorMessage, 
        });

        await logEntry.save();

        res.status(200).json({ 
            message: `Camera ID ${camera_id} failure logged successfully.`,
            logEntry 
        });
    } catch (error) {
        console.error('Error logging camera failure:', error);
        res.status(500).json({ message: 'Error logging failure.', error: error.message });
    }
};
