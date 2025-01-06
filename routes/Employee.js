const express = require('express');
const Router = express.Router();
const multermiddleware = require('../middleware/multer');  // Import multer middleware
const EmployeeController = require('../controllers/Employee'); // Import controller
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
Router.put('/RegisterUpdate/:id', upload.single('EmployeeImage'), EmployeeController.updateEmployeeDetails);

// Route for Employee Registration with image upload
Router.post('/Register', multermiddleware.upload.single('EmployeeImage'), EmployeeController.EmployeeRegistration);

// Other routes
Router.post('/LogIn', EmployeeController.Login);
Router.get('/LogInData', EmployeeController.UserDeails);
// Router.put('/RegisterUpdate/:id', EmployeeController.EmpyeeDetailsUpdate);

Router.delete('/RegisterDelete/:id', EmployeeController.EmployeeDetailsDelete);

module.exports = Router;



// const EmployeeController = require('../controllers/Employee');

// Router.post('/Register',EmployeeController.EmployeeRegistration)
// Router.post('/LogIn',EmployeeController.Login)
// Router.put('/RegisterUpdate/:id',EmployeeController.EmpyeeDetailsUpdate)
// Router.delete('/RegisterDelete/:id',EmployeeController.EmployeeDetailsDelete)