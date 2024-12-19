// // controllers/cameraController.js
// const Camera = require('../model/camera');
// const Fire = require('../model/fire');

// // Save a new frame with Fire/Smoke detection
// exports.saveFrame = async (req, res) => {
//   const { CameraLocationID, label, confidence, image,personCount} = req.body;
//   console.log(req.body)

//   try {
//     // Find the camera by cameraId
//     const camera = await Camera.findOne({ CameraLocationID });
//     if (!camera) {
//       return res.status(404).json({ message: 'Camera not found' });
//     }

//     // Find or create a Fire document associated with the camera's ObjectId
//     let fireRecord = await Fire.findOne({ cameraId: camera._id });
//     if (!fireRecord) {
//       fireRecord = new Fire({ cameraId: camera._id, frames: [] });
//     } else {
//       // Check if the last frame has the same label with similar confidence
//       const lastFrame = fireRecord.frames[fireRecord.frames.length - 1];
//       if (lastFrame && lastFrame.label === label && Math.abs(lastFrame.confidence - confidence) < 5) {
//         return res.status(200).json({ message: 'No significant change detected. Frame not saved.' });
//       }
//     }

//     // Add the new frame since there's a significant change
//     fireRecord.frames.push({
//       label,
//       confidence,
//       image,
//       personCount
//     });
//     await fireRecord.save();

//     res.status(201).json({ message: 'Frame saved successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving frame', error });
//   }
// };
//       // image: Buffer.from(image, 'base64') Store image as base64 encoded



const Camera = require('../models/CamereSchema');
const Fire = require('../models/fire');

exports.saveFrame = async (req, res) => {
  const { CameraLocationID, label, confidence, image, personCount } = req.body;
  console.log(req.body)

  try {
    // Find the camera by CameraLocationID
    const camera = await Camera.findOne({ CameraLocationID });
    if (!camera) {
      return res.status(404).json({ message: 'Camera not found' });
    }

    // Find or create a Fire document associated with the camera's ObjectId
    let fireRecord = await Fire.findOne({ cameraId: camera._id });
    if (!fireRecord) {
      fireRecord = new Fire({ cameraId: camera._id, frames: [] });
    } else {
      // Check if the last frame has the same label with similar confidence
      const lastFrame = fireRecord.frames[fireRecord.frames.length - 1];
      if (lastFrame && lastFrame.label === label && Math.abs(lastFrame.confidence - confidence) < 5) {
        return res.status(200).json({ message: 'No significant change detected. Frame not saved.' });
      }
    }

    // Convert the base64 image to a binary buffer
    // const imageBuffer = Buffer.from(image, 'base64');

    // Add the new frame with image as a binary buffer
    fireRecord.frames.push({
      label,
      confidence,
      image,  // Store image as binary buffer
      personCount
    });

    await fireRecord.save();

    res.status(201).json({ message: 'Frame saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving frame', error });
  }
};


exports.getAllFireFrames = async (req, res) => {
  try {
    // Fetch fire frames and populate the related camera data
    const fireRecords = await Fire.find()
      .populate({
        path: 'cameraId',  // Populate the camera data
        select: 'CameraLocationID'  // Select the CameraLocationID field from the Camera model
      });

    // Process each fire record
    const updatedFireRecords = fireRecords.map(record => {
      // Get the current time and calculate one hour ago
      const oneHourAgo = Date.now() - 60 * 60 * 1000;
    
      // Filter frames for those within the last hour
      let frames = record.frames.filter(frame => new Date(frame.timestamp).getTime() >= oneHourAgo);
    
      // If no frames are within the last hour, fallback to the last 3 frames
      if (frames.length === 0) {
        frames = record.frames.slice(-50); // Take the last 3 frames if no recent data
      }
    
      // Extract and format the relevant data from the frames
      const formattedFrames = frames.map(frame => ({
        label: frame.label,
        confidence: frame.confidence,
        personCount: frame.personCount,
        image: frame.image,  // Image as a binary buffer or base64, as needed
        timestamp: frame.timestamp,
      }));
    
      return {
        ...record.toObject(), // Ensure compatibility with Mongoose documents
        cameraLocation: record.cameraId ? record.cameraId.CameraLocationID : null,
        frames: formattedFrames, // Attach filtered and formatted frames
      };
    });
    

    res.status(200).json(updatedFireRecords);  // Return the updated fire records as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fire records', error });
  }
};
