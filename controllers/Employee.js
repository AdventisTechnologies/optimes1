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
    
    //   const formdata = {
    //     EmployeeID: this.EmployeeResgistration.value.empId,
    //     Name: this.EmployeeResgistration.value.name,
    //     Department: this.EmployeeResgistration.value.department,
    //     Designation: this.EmployeeResgistration.value.designation,
    //     EmailID: this.EmployeeResgistration.value.emailid,
    //     Password: this.EmployeeResgistration.value.password,
    //     Location: this.EmployeeResgistration.value.location,
    //     EmployeeImage: this.EmployeeResgistration.value.empImage, // Binary data from file input
    // };
    // console.log('Form Data:', formdata);










    // EmployeeRegistration: async (req, res) => {
    //   console.log('req.body',req.body);
    //   try {
    //       const { EmployeeID, Name, Department, Designation, EmailID, Password, Location } = req.body;
  
    //       // Handle EmployeeImage - convert ArrayBuffer to Buffer
    //       let EmployeeImage = req.body.EmployeeImage;
    //       if (EmployeeImage && EmployeeImage.data) {
    //           EmployeeImage = Buffer.from(EmployeeImage.data);
    //       }
  
    //       // Check if email is already registered
    //       const ExistingEmail = await EmployeeModel.findOne({ EmailID });
    //       if (ExistingEmail) {
    //           return res.status(400).json({ message: 'User Already Registered' });
    //       }
  
    //       // Hash the password
    //       const salt = await bcrypt.genSalt(10);
    //       const hashedPassword = await bcrypt.hash(Password, salt);
  
    //       // Create the new employee document
    //       const EmployeeData = new EmployeeModel({
    //           EmployeeID,
    //           Name,
    //           Department,
    //           Designation,
    //           EmailID,
    //           Password: hashedPassword,
    //           Location,
    //           EmployeeImage
    //       });
  
    //       console.log('EmployeeData:', EmployeeData);
          
    //       // Save the employee data to the database
    //       await EmployeeData.save();
    //       return res.status(200).json({ message: 'Successfully Registered' });
          
    //   } catch (error) {
    //       console.error('Error registering employee:', error);
    //       return res.status(400).json({ error });
    //   }
    // },
     EmployeeRegistration : async (req, res) => {
      console.log(req.body);  // Logs non-file fields
      console.log(req.file);  // Logs the uploaded file (EmployeeImage)
  
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }
  
      try {
          const { EmployeeID, Name, Department, Designation, EmailID, Password, Location } = req.body;
  
          // Handle the EmployeeImage field (stored as binary data)
          const EmployeeImage = req.file ? req.file.buffer : null;  // Multer saves the image as a buffer
  
          // Check if the email is already registered
          // const ExistingEmail = await EmployeeModel.findOne({ EmailID });
          // if (ExistingEmail) {
          //     return res.status(400).json({ message: 'User Already Registered' });
          // }
  
          // Hash the password before saving it
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(Password, salt);
  
          // Create the employee object to save in the database
          const EmployeeData = new EmployeeModel({
              EmployeeID,
              Name,
              Department,
              Designation,
              EmailID: Designation === 'Safety' ? req.body.EmailID : undefined, // Include only for Safety
              Password: hashedPassword,
              Location,
              EmployeeImage  // Save the image as binary data in the database
          });
  
          // Save the employee data to the database
          await EmployeeData.save();
          return res.status(200).json({ message: 'Successfully Registered' });
  
      } catch (error) {
          return res.status(400).json({ error: error.message });  // Provide a specific error message
      }
  },
  
  

    // EmployeeRegistration:async (req,res) => {
    //     console.log(req.body)
    //     try{
    //        const {EmployeeID,Name,FirstName,LastName,Department,EmailID,Password,Designation,Location} = req.body;
    //     //    const ExistingUser = await EmployeeModel.findOne({EmployeeID})
    //     //    if(ExistingUser){
    //     //     return res.status(400).json({message:'User alredy Registerd'})
    //     //    }


    //     //    const salt = await bycript.gensalt(10);
    //     //    const HashedPassword = await bycript.hash(Password,salt);

    //           const EmployeeData = new EmployeeModel({
    //             // EmployeeID : EmployeeID,
    //             Name: {
    //                 FirstName:Name. FirstName,
    //                 LastName: Name.LastName
    //             },
    //             EmailID : EmailID,
    //             Password:Password,
    //             // Password:HashedPassword,
    //             // Department :Department,
    //             // Designation :Designation,
    //             // Location :Location,
    //           })
    //           console.log('EmployeeData',EmployeeData)
    //           await EmployeeData.save();
    //           return res.status(200).json({message:'Succesfully Registerd'})

    //     }catch(error){
    //         return res.status(400).json({error})
    //     }
    // },

      
      
    // Login: async (req, res) => {
    //     try {
    //       console.log(req.body);
          
    //       const { EmailID, Password } = req.body;
          
    //       // Check if the user exists
    //       const ExistingEmail = await EmployeeModel.findOne({ EmailID });
    //       if (!ExistingEmail) {
    //         return res.status(400).json({ message: 'User Not Found' });
    //       }
      
    //       // Compare provided password with stored password
    //       const ComparePassword = await bycript.compare(Password, ExistingEmail.Password); // Correct order: plain password first, hashed password second
      
    //       if (ComparePassword) {
    //         // Generate JWT token if password matches
    //         const token = await  jwt.sign({ email: ExistingEmail.EmailID }, 'credo_secret', { expiresIn: '1h' });
    //         console.log('Generated Token:', token);
      
    //         return res
    //           .status(200)
    //           .header('Authorization', 'Bearer ' + token) // Optionally set the token in headers
    //           .json({ message: 'Successfully logged in', token });
    //       } else {
    //         return res.status(400).json({ message: 'Invalid credentials' });
    //       }
    //     } catch (err) {
    //       return res.status(400).json({ error: err.message });
    //     }
    //   },
      UserDeails:async (req,res)=>{
        try{
            const data = await EmployeeModel.find()
            return res.status(200).json(data)
        }catch(error){
         return res.status(400).json(error)
        }
   },
    // EmpyeeDetailsUpdate: async (req,res) =>{
    //     try{
    //         const {EmployeeID,FirstName,LastName,Department,EmailID,Password,Designation,Location} = req.body;
    //         const ExistingUser = await EmployeeModel.findOne({EmployeeID})
    //         if(!ExistingUser){
    //             return res.status(400).json({message:'User Not Found'})
    //         }
    //         if(Password){
    //             const Salt = await bycript.gensalt(10);
    //             const hashedPassword = await bycript.hash(Password,Salt)
    //             ExistingUser.Password = hashedPassword;
    //         }
    //         ExistingUser.Name.FirstName = FirstName;
    //         ExistingUser.Name.LastName= LastName;
    //         ExistingUser.Department = Department;
    //         ExistingUser.EmailID = EmailID;
    //         ExistingUser.Designation = Designation;
    //         ExistingUser.Location = Location;

    //         await ExistingUser.save();
    //         return res.status(200).json({message:'Updated Succesfully'})

    //     }catch(error){
    //         return res.status(400).json({error})
    //     }
        
    // },



    // EmpyeeDetailsUpdate: async (req, res) => {
    //   console.log('Received request to update employee details:', req.body);
    //   console.log('Received EmployeeImage:', req.body.EmployeeImage);

    
    //   try {
    //     // Get the employee details from the request body
    //     const { Name, Department, EmailID, Password, Designation, Location } = req.body;
    //     const employeeIdToUpdate = req.params.id; // Use the ObjectId passed in the URL
    
    //     // Validate the employee ID
    //     if (!employeeIdToUpdate) {
    //       return res.status(400).json({ message: 'Employee ID is required' });
    //     }
    
    //     // Find the employee using the MongoDB ObjectId
    //     const employee = await EmployeeModel.findById(employeeIdToUpdate);
    
    //     // If employee is not found, return an error
    //     if (!employee) {
    //       return res.status(404).json({ message: 'Employee not found' });
    //     }
    
    //     console.log('Employee found:', employee);
    
    //     // Conditionally update the fields provided in the request body
    //     if (Password) {
    //       // Hash and update the password if provided
    //       const salt = await bcrypt.genSalt(10);
    //       const hashedPassword = await bcrypt.hash(Password, salt);
    //       console.log('Password provided, hashing and updating password...');
    //       employee.Password = hashedPassword;
    //     }
    
    //     // Update other fields if provided
    //     if (Name) employee.Name = Name;
    //     if (Department) employee.Department = Department;
    //     if (EmailID) {
    //       // Validate that the EmailID is unique
    //       const existingEmail = await EmployeeModel.findOne({ EmailID });
    //       if (existingEmail && existingEmail.EmployeeID !== employee.EmployeeID) {
    //         return res.status(400).json({ message: 'EmailID must be unique' });
    //       }
    //       employee.EmailID = EmailID;
    //     }
    //     if (Designation) employee.Designation = Designation;
    //     if (Location) employee.Location = Location;
    
    //     // Handle the employee image
    //     if (req.body.EmployeeImage && Object.keys(req.body.EmployeeImage).length > 0) {
    //       console.log('Employee image received, processing...');
    //       // Process the image
    //     } else {
    //       console.log('No image data received.');
    //     }
        
    
    //     console.log('Employee details updated, saving to the database...');
    //     // Save the updated employee details
    //     await employee.save();
    
    //     console.log('Employee details successfully updated', employee);
    //     return res.status(200).json({ message: 'Updated Successfully' });
    
    //   } catch (error) {
    //     console.error('Error updating employee details:', error); // Log the error for debugging
    //     return res.status(400).json({ error: error.message }); // Return a readable error message
    //   }
    // },
// Controller to update employee details
 updateEmployeeDetails : async (req, res) => {
  console.log('Received request to update employee details:', req.body);
  console.log('Received EmployeeImage:', req.file);

  try {
    const { EmployeeID,Name, Department, EmailID, Password, Designation, Location } = req.body;
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


