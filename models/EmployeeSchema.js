const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    EmployeeID: {
        type: String,
        unique: true,
        required: [true, 'EmployeeID should be mandatory']
    },
    Name: {
        type: String,
        required: [true, 'Name should be mandatory']
    },
    Department: {
        type: String,
        required: [true, 'Department should be mandatory']
    },
    Designation: {
        type: String,
        required: [true, 'Designation should be mandatory']
    },
    EmailID: {
        type: String,
        unique: true,
        sparse: true,          // Allows unique constraint to ignore documents without an email
        default: null,           // Set default as null to avoid duplicate `null` entries
        default: null,  // Ensure null is allowed initially
        validate: {
            validator: function (value) {
                if (value === null || value === '') {
                    return true;  // Allow null or empty string (will be handled as unique)
                }
                // Else, ensure the email is valid
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return emailRegex.test(value);  // Validate if it matches the email pattern
            },
            message: 'Please provide a valid email address.'
        }
    },
    Password: {
        type: String,
        required: false,

    },
    Location: {
        type: String,
        required: false
    },
    EmployeeImage: {
        type: Buffer,
        required: [true, 'Employee image should be mandatory']
    }
});

// Pre-save hook to set EmailID to undefined if it's null or empty string
EmployeeSchema.pre('save', function (next) {
    // Set EmailID to undefined if it is empty or null
    if (!this.EmailID || this.EmailID.trim() === '') {
        this.EmailID = undefined;
    }
    // Set Password to undefined if it is empty or null
    if (!this.Password || this.Password.trim() === '') {
        this.Password = undefined;
    }
    next();
});



module.exports = mongoose.model('EmployeeData', EmployeeSchema);


// Name :{
//     FirstName:{
//         type:String,
//         unique:false,
//         required:[true,'First Name should be mandory']
//     },
//     LastName:{
//         type:String,
//         unique:false,
//         required:[true,'Last Name should be mandory']
//     }
// },