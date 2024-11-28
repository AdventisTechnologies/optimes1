const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const ppeRouter = require('./Route/ppeRoutes');
const userRoutes = require('./Route/user');
const cameraRoutes = require('./Route/cameraRouters');
const cameraFire = require('./Route/fire');
const camere = require('./Route/Camera');
const employee = require('./Route/Employee');






require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' })); // Adjust limit for large payloads if needed
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

// MongoDB connection
const url = 'mongodb+srv://srmrmpparthiban:20a8yW18xd48XYJ9@cluster0.vviu6.mongodb.net/optimus';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected..."))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use('/api/ppe', ppeRouter);
app.use('/api/getppeKits', ppeRouter);
app.use('/api/users', userRoutes);
app.use('/api/cameras', cameraRoutes);
app.use('/api/getcamera',cameraRoutes)
app.use('/api/fire', cameraFire);

app.use('/api/getcamere', camere);
app.use('/api/getimage', employee);
// app.use('/api/getfireEx',cameraFire)




require('./utils/cronJob'); // Adjust the path if necessary

// Your other middleware and routes
app.get('/some-endpoint', (req, res) => {
  // Your endpoint logic
});


// Set a global timeout for requests
const timeoutDuration = 60000; // 60 seconds
app.use((req, res, next) => {
    res.setTimeout(timeoutDuration, () => {
        console.error('Request has timed out.');
        res.status(408).send('Request has timed out.');
    });
    next();
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Example of handling a detection update event
    socket.on('detection_update', (data) => {
        // Emit data to clients or handle it as necessary
        io.emit('detection_update', data);
    });
});

// Handle all other routes
app.get('*', (req, res) => {
    
    res.status(404).send('Not Found'); // Respond with 404 for unmatched routes
});

// Start the server
server.listen(3000, () => {
    console.log("Node.js server running on port 3000...");
});
