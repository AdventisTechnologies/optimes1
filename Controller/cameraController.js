// controllers/camera.controller.js

const Camera = require('../model/camera');

// Add a new camera
exports.addCamera = async (req, res) => {
    try {
        const { cameraId, cameraUsername, cameraPassword, cameraIp } = req.body;
        const newCamera = new Camera({ cameraId, cameraUsername, cameraPassword, cameraIp });
        await newCamera.save();
        res.status(201).json({ message: 'Camera added successfully', data: newCamera });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add camera', error: error.message });
    }
};

// Get all cameras
exports.getAllCameras = async (req, res) => {
    try {
        const cameras = await Camera.find();
        res.status(200).json(cameras);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve cameras', err: err.message });
    }
};

// Get a camera by ID
exports.getCameraById = async (req, res) => {
    try {
        const camera = await Camera.findById(req.params.id);
        if (!camera) {
            return res.status(404).json({ message: 'Camera not found' });
        }
        res.status(200).json(camera);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve camera', error: error.message });
    }
};

// Update a camera by ID
exports.updateCamera = async (req, res) => {
    try {
        const updatedCamera = await Camera.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCamera) {
            return res.status(404).json({ message: 'Camera not found' });
        }
        res.status(200).json({ message: 'Camera updated successfully', data: updatedCamera });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update camera', error: error.message });
    }
};

// Delete a camera by ID
exports.deleteCamera = async (req, res) => {
    try {
        const deletedCamera = await Camera.findByIdAndDelete(req.params.id);
        if (!deletedCamera) {
            return res.status(404).json({ message: 'Camera not found' });
        }
        res.status(200).json({ message: 'Camera deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete camera', error: error.message });
    }
};
