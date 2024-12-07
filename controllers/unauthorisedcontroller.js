const axios = require('axios');

// const cv = require('opencv4nodejs'); // Ensure OpenCV package for image processing

const mongoose = require('mongoose');
const UnauthorizedEntry = require('../models/unauthorised');
const Occupancy = require('../models/restrict');
const PPEKit = require('../models/ppekit');
const Fire = require('../models/fire');

// Function to fetch employee details from the API
const getEmployeeDetails = async () => {
  try {
    const { data } = await axios.get(employeeUrl);
    // Decoding base64 image for each employee
    return data.map(employee => {
      employee.employeeImage = decodeBase64Image(employee.employeeImage);
      return employee;
    });
  } catch (error) {
    console.error('Error fetching employee details:', error);
    return [];
  }
};

// Decode base64 image to binary using OpenCV
const decodeBase64Image = (base64Str) => {
  const buffer = Buffer.from(base64Str, 'base64');
  return cv.imdecode(buffer); // Decode to image using OpenCV
};

// Function to store unauthorized entry in MongoDB
const storeUnauthorizedEntry = async (entryData) => {
  try {
    // Create a new instance of the UnauthorizedEntry model
    const unauthorizedEntry = new UnauthorizedEntry(entryData);

    // Save the entry to MongoDB
    await unauthorizedEntry.save();
    console.log('Unauthorized entry stored successfully in MongoDB.');
  } catch (error) {
    console.error('Error storing unauthorized entry in MongoDB:', error);
  }
};

// Function to compare face with stored employee image
const compareFaceWithEmployee = async (faceEncoding) => {
  const employees = await getEmployeeDetails();
  for (let employee of employees) {
    const isMatch = compareFaceEncodingWithStoredImage(faceEncoding, employee.employeeImage);
    if (isMatch) {
      return employee;
    }
  }
  return null;
};

// Compare live face encoding with stored employee image
const compareFaceEncodingWithStoredImage = (liveEncoding, storedImage) => {
  // Use some library or service for face comparison logic
  // Return true if the faces match, else false
  return true; // For now, this is a mock function
};

// Function to check if the employee is authorized
const isAuthorized = (employeeDetails, camera) => {
  return employeeDetails.location === camera.LocationName;
};


const getunauthorisedData = async (req, res) => {
  try {
      // Fetch all occupancy data from the database
      const UnauthorisedData = await UnauthorizedEntry.find();

      // Respond with the retrieved data
      res.status(200).json(UnauthorisedData);
  } catch (error) {
      // Handle any errors

      res.status(500).json({ error: 'Failed to fetch data', message: error.message });
  }
};
// // Define schemas for your tables
// const Table1Schema = new mongoose.Schema({ /* your schema */ });
// const Table1 = mongoose.model('Table1', Table1Schema);

// const Table2Schema = new mongoose.Schema({ /* your schema */ });
// const Table2 = mongoose.model('Table2', Table2Schema);



const nodification = async (req, res) => {

  try {
    const latestRows = {
      table1: await UnauthorizedEntry.find().sort({ createdAt: -1 }).limit(1),
      table2: await Occupancy.find().sort({ createdAt: -1 }).limit(1),
      table3: await PPEKit.find().sort({ createdAt: -1 }).limit(1),
      table4: await Fire.find().sort({ createdAt: -1 }).limit(1),
      // Repeat for other tables...
    };
    res.json(latestRows);
  } catch (err) {
    res.status(500).send('Error checking updates');
  }

}


module.exports = { getEmployeeDetails, storeUnauthorizedEntry, compareFaceWithEmployee, isAuthorized,getunauthorisedData,nodification };
