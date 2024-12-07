const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    employeeId:{type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String },
    age: { type: Number },
    role: { type: String, default: 'user' }, // e.g., 'admin', 'user', etc.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
