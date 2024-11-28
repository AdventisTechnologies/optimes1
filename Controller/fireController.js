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



const Camera = require('../model/CamereSchema');
const Fire = require('../model/fire');

const generateFireEmailContent = require('../utils/emailcontentfire');

const sendMail = require('../utils/mailer');

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
      if (
        lastFrame &&
        lastFrame.label === label &&
        Math.abs(lastFrame.confidence - confidence) < 5 &&
        lastFrame.personCount === personCount
      ) {
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
      personCount,
      scenario:"Hazard Warnings"

    });

    await fireRecord.save();

    // Generate and send email notification
    // Generate and send email notification
    const normalizedLabel = label.toLowerCase(); // Normalize label to lowercase

    if (['fire', 'smoke', 'smoking'].includes(normalizedLabel)) {
      const formattedConfidence = confidence.toFixed(3);
    
      // Determine the email subject based on the label
      let emailSubject = 'Smoke Detected Notification'; // Default subject
      if (normalizedLabel === 'smoking') {
        emailSubject = 'Smoking Detected Notification';
      } 
      // else if (normalizedLabel === 'fire-extinguisher') {
      //   emailSubject = 'Fire Extinguisher Detected Notification';
      // }
      else if (normalizedLabel === 'fire') {
        emailSubject = 'Fire Detected Notification';
      }
      
    
      const emailContent = generateFireEmailContent({
        label,
        confidence: formattedConfidence,
        personCount,
        cameraLocationID: CameraLocationID,
      });
    
      await sendMail(
        'monishamar02@gmail.com',
        emailSubject, // Use the determined subject
        emailContent
      );
      console.log('Notification email sent.');
    }
    


    res.status(201).json({ message: 'Frame saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving frame', error });
  }
};





exports.getAallfireEx = async (req, res) => {
  try {
    console.log("Fetching Fire data...");

    // Step 1: Fetch all fire records with label 'fire-extinguisher' in frames
    const fireEX = await Fire.find(
      { frames: { $elemMatch: { label: { $regex: /fire-extinguisher/i } } } },
      'cameraId frames'
    ).populate('cameraId');

    // Step 2: Filter frames to include only those with the label 'fire-extinguisher'
    const filteredData = fireEX.map(record => ({
      cameraId: record.cameraId,
      frames: record.frames.filter(frame => frame.label && /fire-extinguisher/i.test(frame.label))
    }));


for (let record of filteredData) {
  // Check if the cameraId exists in the Camera table
  const camera = await Camera.findById(record.cameraId);

}

const cameraIdsInFilteredData = filteredData.map(record => record.cameraId);

// Query the Camera table for cameras that are not in filteredData
const camerasNotInFilteredData = await Camera.find({
  _id: { $nin: cameraIdsInFilteredData } // $nin operator matches documents where the field's value is not in the given array
});


  // Extract CameraLocationID and other relevant details from camerasNotInFilteredData
const missingCameraIds = camerasNotInFilteredData.map(camera => camera.CameraLocationID);

// Compose email content
const emailContent = `The following cameras are missing Fire Extinguisher: ${missingCameraIds.join(', ')}


Please ensure that fire extinguishers are installed at these camera locations as soon as possible to maintain safety compliance.
  
    
  Best regards,
  Safety Management System
  `;

// Send email (uncomment to enable email sending)
await sendMail('monishamar02@gmail.com', 'Missing Fire Extinguisher Notification', emailContent);
console.log(`Email sent with missing camera IDs: ${missingCameraIds.join(', ')}`);



return camerasNotInFilteredData;
} catch (error) {
    res.status(500).json({ message: 'Error fetching fire data', error });
  }
};

