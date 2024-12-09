// Import necessary modules
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');

// Import Routes
const EmployeeRoute = require('./routes/Employee');
const CameraRoute = require('./routes/Camera');
const CameraEventRoute = require('./routes/CamereEvents');
const ppeRoutes = require('./routes/ppeRoutes');
const userRoutes = require('./routes/user');
const cameraFire = require('./routes/fire');
const restrictRoute = require('./routes/restrictRoute');
const unauthorizedRoute = require('./routes/unauthorisedRoute');

// Initialize app and server
const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
  // origin: 'http://localhost:4200', // Allow requests from Angular app
  origin: 'https://optimes-1.onrender.com', // Allow requests from Angular app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // Include credentials if necessary
}));

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:4200', // your frontend URL
    origin: 'https://optimes-1.onrender.com', // your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Static file serving
app.use('', express.static(path.join(__dirname, 'opti-mes')));

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api/user', EmployeeRoute);
app.use('/api/user', CameraRoute);
app.use('/api/user', CameraEventRoute);
app.use('/api/ppe', ppeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fire', cameraFire);
app.use('/api/user', restrictRoute);
app.use('/api/user', unauthorizedRoute);

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Watch for changes in MongoDB collections
const watchCollections = () => {
  const collections = [
    { model: require('./models/ppekit'), tableName: 'PPEKit' },
    // Add other collections here if needed
  ];

  collections.forEach(({ model, tableName }) => {
    model.watch().on('change', (change) => {
      console.log(`Change detected in ${tableName}:`, change);
      io.emit('notification', { table: tableName, data: change.fullDocument });
    });
  });
};

// Call the function to start watching collections
watchCollections();

// Test notification endpoint
app.get('/test-notification', (req, res) => {
  io.emit('notification', { table: 'PPEKit', data: { test: 'Manual notification' } });
  res.send('Test notification sent');
});

// Export app for testing or other purposes
module.exports = app;

// // Start the server
// const port = process.env.PORT || 4000;
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
