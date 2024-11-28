const PPEKit = require('../model/ppekit');
// const Camera = require('../model/camera'); 

const Camera = require('../model/CamereSchema');

const User = require('../model/EmployeeSchema'); // Import User model

const generateEmailContent = require('../utils/emailContent');

const sendMail = require('../utils/mailer');

exports.addPPEKit = async (req, res) => {
    try {
        const { personName, image, hardhat, mask, safetyVest, CameraLocationID, glass, safetyBoot } = req.body;
        console.log(req.body);

        const missingItems = [
            { name: 'Hardhat', isPresent: hardhat },
            { name: 'Mask', isPresent: mask },
            { name: 'Safety Vest', isPresent: safetyVest },
            { name: 'Safety Boots', isPresent: safetyBoot },
            { name: 'Glasses', isPresent: glass },
        ].filter(item => !item.isPresent);


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
                missingTo: hardhat && mask && safetyVest && safetyBoot && glass ? currentTime : null,
                scenario:"Worker Health & Safety Events"
            });
            await newPPEKit.save();
          //mail
            if (missingItems.length) {
                const emailContent = generateEmailContent({
                    personName: null,
                    isUnknown: true,
                    missingItems,
                    cameraLocationID: camera.CameraLocationID

                });
                await sendMail('monishamar02@gmail.com', 'Missing PPE Notification', emailContent);
            }
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
                missingTo: hardhat && mask && safetyVest && safetyBoot && glass ? currentTime : null,
                scenario:"Worker Health & Safety Events"

            });
            await newPPEKit.save();
         //mail
            if (missingItems.length) {
                const emailContent = generateEmailContent({
                personName: employee.EmployeeID, // Employee's name
                isUnknown: false,
                missingItems,
                 cameraLocationID: camera.CameraLocationID
                });
                await sendMail('monishamar02@gmail.com', 'Missing PPE Notification', emailContent);
            }

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
                    missingTo: hardhat && mask && safetyVest || !safetyBoot || !glass ? currentTime : null,
                    scenario:"Worker Health & Safety Events"

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

                const emailContent = generateEmailContent({
                    personName: employee.EmployeeID, // Employee's name
                    isUnknown: false,
                    missingItems,
                    cameraLocationID: camera.CameraLocationID,
                });
                await sendMail('monishamar02@gmail.com', 'PPE Status Update - Missing Items', emailContent);

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
        const ppeKits = await PPEKit.find().populate('personName').populate('camera'); // Populate personName (User) and camera

        // Add lastStatusChange to each PPEKit
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
                cameraId: kit.camera.cameraId, // Include cameraId
                personName: kit.personName ? { name: kit.personName.userName, employeeId: kit.personName.employeeId } : null
            };
        });

        res.status(200).json(updatedPPEKits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching PPE data', error });
    }
};


