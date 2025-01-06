// controllers/userController.js
const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.json({ message: "User updated successfully", user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const EmployeeModel = require('../models/EmployeeSchema')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store the file in memory (buffer)
// const upload = multer({ storage: storage }).single('EmployeeImage'); // Handle single file upload with field name 'EmployeeImage'
// const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

module.exports = {
    
    Login: async (req, res) => {
        // console.log(req.body);
        try {
          const { EmailID, Password } = req.body;
    
          // Check if the user exists
          const ExistingEmail = await EmployeeModel.findOne({ EmailID });
          if (!ExistingEmail) {
            return res.status(400).json({ message: 'User Not Found' });
          }
          // console.log('1');
    
          // Compare provided password with the hashed password in DB
          const ComparePassword = await  bycript.compare(Password, ExistingEmail.Password);
          // console.log('Password compared:', ComparePassword);
    
          if (ComparePassword) {
            // Generate JWT token
            const token = jwt.sign(
              { email: ExistingEmail.EmailID },
              'credo_secret', // Change this to process.env.JWT_SECRET in production
              { expiresIn: '1h' }
            );
    
            // console.log('Generated Token:', token);
    
            // Send the token in the response
            return res
              .status(200)
              .header('Authorization', 'Bearer ' + token)
              .json({ message: 'Successfully logged in', token });
          } else {
            // console.log('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
          }
        } catch (err) {
          // console.error('Error occurred:', err);
          return res.status(400).json({ err });
        }
      },
    

    EmployeeRegistration: async (req, res) => {
      try {
          const { EmployeeID, Name, Rfid, Department, Designation, EmailID, Password, Location } = req.body;
  
          if (!req.file) {
              return res.status(400).json({ message: 'EmployeeImage is required' });
          }
  
          const EmployeeImage = req.file.buffer;
  
          // Check if EmployeeID already exists
          const existingEmployee = await EmployeeModel.findOne({ EmployeeID });
          if (existingEmployee) {
              return res.status(400).json({ message: 'EmployeeID already registered' });
          }
  
          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(Password, salt);
  
          // Create and save the employee
          const EmployeeData = new EmployeeModel({
              EmployeeID,
              Name,
              Rfid,
              Department,
              Designation,
              EmailID: Designation === 'Safety' ? EmailID : undefined,
              Password: hashedPassword,
              Location,
              EmployeeImage,
          });
  
          await EmployeeData.save();
          return res.status(200).json({ message: 'Successfully Registered' });
      } catch (error) {
          console.error('Error during registration:', error);
          return res.status(400).json({ error: error.message });
      }
  },
  
  
  

  
      UserDeails:async (req,res)=>{
        try{
            const data = await EmployeeModel.find()
            return res.status(200).json(data)
        }catch(error){
         return res.status(400).json(error)
        }
   },

// Controller to update employee details
 updateEmployeeDetails : async (req, res) => {
  console.log('Received request to update employee details:', req.body);
  console.log('Received EmployeeImage:', req.file);

  try {
    const { EmployeeID,Name, Rfid, Department, EmailID, Password, Designation, Location } = req.body;
    const employeeIdToUpdate = req.params.id;

    if (!employeeIdToUpdate) {
      return res.status(400).json({ message: 'Employee ID is required' });
    }

    // Find employee by ID
    const employee = await EmployeeModel.findById(employeeIdToUpdate);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update password if provided
    if (Password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);
      employee.Password = hashedPassword;
    }

    if (EmployeeID) employee.EmployeeID = EmployeeID;
    // Update other fields
    if (Name) employee.Name = Name;
    if (Rfid) employee.Name = Rfid;
    if (Department) employee.Department = Department;
    if (EmailID) employee.EmailID = EmailID;
    if (Designation) employee.Designation = Designation;
    if (Location) employee.Location = Location;

    // Update EmployeeImage if provided
    if (req.file) {
      console.log('Employee image received, updating...');
      employee.EmployeeImage = req.file.buffer; // Store image as binary
    }

    // Save updated employee
    await employee.save();
    return res.status(200).json({ message: 'Updated Successfully' });
  } catch (error) {
    console.error('Error updating employee details:', error);
    return res.status(400).json({ error: error.message });
  }
},
    
    
    
    
    
    EmployeeDetailsDelete: async (req,res) =>{
     try{
        await EmployeeModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:'Succesfully Deleted'})
     }catch(err){
        return res.status(500).json({err:err})
     }
    },
}


