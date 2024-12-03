const PPEKit = require('../models/ppekit');
// const Camera = require('../model/camera'); 

const Camera = require('../models/CamereSchema');

const User = require('../models/EmployeeSchema'); // Import User model

exports.addPPEKit = async (req, res) => {
    try {
        const { personName, image, hardhat, mask, safetyVest, CameraLocationID, glass, safetyBoot } = req.body;
        console.log(req.body);

        // Find the camera by CameraLocationID
        const camera = await Camera.findOne({ CameraLocationID });
        if (!camera) {
            return res.status(400).json({ message: 'Camera not found' });
        }

        const currentTime = new Date();

        // Handle "Unknown" person
        if (personName === "Unknown") {
            const newPPEKit = new PPEKit({
                personName: null, // Null for unknown person
                image,
                hardhat,
                mask,
                safetyVest,
                camera: camera._id,
                safetyBoot, // Include safetyBoot
                glass,      // Include glass
                missingFrom: hardhat && mask && safetyVest && safetyBoot && glass ? null : currentTime,
                missingTo: hardhat && mask && safetyVest && safetyBoot && glass ? currentTime : null
            });
            await newPPEKit.save();
            return res.status(201).json({ message: 'PPE data saved for unknown person', data: newPPEKit });
        }

        // For known users, fetch the user by EmployeeID (instead of Name)
        const employee = await User.findOne({ EmployeeID: personName }); // Using EmployeeID to find the employee
        if (!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }

        // Check for existing PPEKit record for the employee
        let existingPPEKit = await PPEKit.findOne({ personName: employee._id });

        if (!existingPPEKit) {
            const newPPEKit = new PPEKit({
                personName: employee._id, // Save the employee _id as personName
                image,
                hardhat,
                mask,
                safetyBoot, // Include safetyBoot
                glass,      // Include glass
                safetyVest,
                camera: camera._id,
                missingFrom: hardhat && mask && safetyVest && safetyBoot && glass ? null : currentTime,
                missingTo: hardhat && mask && safetyVest && safetyBoot && glass ? currentTime : null
            });
            await newPPEKit.save();
            return res.status(201).json({ message: 'PPE data saved successfully', data: newPPEKit });
        } else {
            const statusChanged = (
                existingPPEKit.hardhat !== hardhat ||
                existingPPEKit.mask !== mask ||
                existingPPEKit.safetyVest !== safetyVest ||
                existingPPEKit.safetyBoot !== safetyBoot ||  // Check for safetyBoot change
                existingPPEKit.glass !== glass            
            );

            if (statusChanged) {
                const updatedData = {
                    hardhat,
                    mask,
                    safetyVest,
                    camera: camera._id,
                    safetyBoot, // Update safetyBoot
                    glass,      // Update glass
                    missingFrom: !hardhat || !mask || !safetyVest || !safetyBoot || !glass ? currentTime : existingPPEKit.missingFrom,
                    missingTo: hardhat && mask && safetyVest || !safetyBoot || !glass ? currentTime : null
                };

                existingPPEKit.statusChanges.push({
                    hardhat: existingPPEKit.hardhat,
                    mask: existingPPEKit.mask,
                    safetyBoot: existingPPEKit.safetyBoot,   // Add previous safetyBoot status
                    glass: existingPPEKit.glass, 
                    safetyVest: existingPPEKit.safetyVest,
                    missingFrom: existingPPEKit.missingFrom,
                    missingTo: currentTime,
                    
                    image,
                    camera: camera._id,
                });

                Object.assign(existingPPEKit, updatedData);
                await existingPPEKit.save();

                res.status(200).json({ message: 'PPE status updated successfully', data: existingPPEKit });
            } else {
                res.status(200).json({ message: 'No changes detected in PPE status', data: existingPPEKit });
            }
        }
    } catch (error) {
        console.error("Error:", error); // Log error
        res.status(500).json({ message: 'Error saving or updating PPE data', error });
    }
};




// GET all PPEKits
// In your controller file (e.g., ppeKitController.js)

// In your backend code
exports.getAllPPEKits = async (req, res) => {
    try {
        // Populate 'personName' and 'camera' properly
        const ppeKits = await PPEKit.find()
            .populate({
                path: 'personName',
                select: 'Name EmployeeID'  // Optionally select specific fields if needed
            })
            .populate({
                path: 'camera',
                select: 'CameraLocationID'  // Select the necessary fields for the camera
            });


        const updatedPPEKits = ppeKits.map(kit => {
            let lastStatusChange = null;
            let image = kit.image; // Default to the main image

            if (kit.statusChanges.length > 0) {
                lastStatusChange = kit.statusChanges[kit.statusChanges.length - 1];
                image = lastStatusChange.image;
            }

            return { 
                ...kit.toObject(), 
                lastStatusChange: {
                    ...lastStatusChange,
                    image
                },
                cameraId: kit.camera ? kit.camera.CameraLocationID : null, // Ensure cameraId is handled correctly
                personName: kit.personName ? { name: kit.personName.Name, employeeId: kit.personName.EmployeeID } : null
            };
        });

        res.status(200).json(updatedPPEKits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching PPE data', error });
    }
};



