// Import Routes
const EmployeeRoute = require('./routes/Employee');
const CamereRoute = require('./routes/Camera');
const CamereEventRoute = require('./routes/CamereEvents');
const ppeRoutes = require('./routes/ppeRoutes');
const userRoutes = require('./routes/user');
const cameraFire = require('./routes/fire');
const restrictroute = require('./routes/restrictRoute');
const unauthorisedroute = require('./routes/unauthorisedRoute');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const path = require('path');

// app.use(express.static(path.join(__dirname, 'dist', 'opti-mes' , 'browser')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'opti-mes','browser' ,'index.html'));
// });

app.use('', express.static(path.join(__dirname, 'opti-mes')));


// Enable CORS for all routes - only need one cors middleware
app.use(cors({
  // origin: 'http://localhost:4200', // Allow requests from Angular app
  origin: 'https://optimes-1.onrender.com', // Allow requests from Angular app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true               // Include credentials if necessary
}));

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'https://optimes-1.onrender.com', // Allow Angular app to connect
    // origin: 'http://localhost:4200', // Allow Angular app to connect
    methods: ['GET', 'POST'],
    credentials: true
  },
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api/user', EmployeeRoute);  // Routes for user
app.use('/api/user', CamereRoute);    // Routes for cameras
app.use('/api/user', CamereEventRoute); // Routes for camera events
app.use('/api/ppe', ppeRoutes); // Routes for PPE
app.use('/api/users', userRoutes);
app.use('/api/fire', cameraFire);
app.use('/api', cameraFire);
app.use('/api/user', restrictroute); 
app.use('/api/user', unauthorisedroute);

// Watch for changes in collections
const watchCollections = () => {
  const collections = [
    { model: require('./models/ppekit'), tableName: 'PPEKit' },
  ];

  collections.forEach(({ model, tableName }) => {
    model.watch().on('change', (change) => {
      if (change.operationType === 'insert') {
        console.log('Change detected:', change); // Add this for debugging
        io.emit('notification', { table: tableName, data: change.fullDocument });

      }
    });
  });
};

// Test endpoint to emit a notification
app.get('/test-notification', (req, res) => {
  io.emit('notification', { table: 'PPEKit', data: { test: true } });
  res.send('Test notification sent');
});

// Start watching for changes in MongoDB collections
watchCollections();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');
});

// Export app for testing and running the server
module.exports = app;

// Start the server (you can place this in a separate file like `server.js` if needed)
// server.listen(4000, () => {
//   console.log('Server running on http://localhost:4000');
// });
