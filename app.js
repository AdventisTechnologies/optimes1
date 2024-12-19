require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');

// Import Routes
const EmployeeRoute = require('./routes/Employee');
const CamereRoute = require('./routes/Camera');
const CamereEventRoute = require('./routes/CamereEvents');
const ppeRoutes = require('./routes/ppeRoutes');
const userRoutes = require('./routes/user');
const cameraFire = require('./routes/fire');
const restrictroute = require('./routes/restrictRoute');
const unauthorisedroute = require('./routes/unauthorisedRoute');
const cameralog = require('./routes/defaultCamera');

// Environment Variables
const port = process.env.PORT || 10000;
const mongoURI = process.env.MONGODB;
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigin = isProduction ? 'https://optimes-1.onrender.com' : 'http://localhost:4200';

// Initialize app and server
const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Static file serving
app.use('', express.static(path.join(__dirname, 'opti-mes')));

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api/user', EmployeeRoute);  // Routes for user
app.use('/api/user', CamereRoute);    // Routes for cameras
app.use('/api/user', CamereEventRoute); // Routes for camera events
app.use('/api/ppe', ppeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fire', cameraFire);
app.use('/api', cameraFire);
app.use('/api/user', restrictroute); 
app.use('/api/user', unauthorisedroute);
app.use('/camera', cameralog);

// MongoDB Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if unable to connect
  });
// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.id, 'Reason:', reason);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Watch MongoDB collections
const watchCollections = () => {
  const collections = [
    { model: require('./models/ppekit'), tableName: 'PPEKit' },
    { model: require('./models/restrict'), tableName: 'Occupancy' },
    { model: require('./models/fire'), tableName: 'Fire' },
    { model: require('./models/unauthorised'), tableName: 'UnauthorizedEntry' },
    { model: require('./models/defaultCamera'), tableName: 'cameralog' },
    // Add other collections here if needed
  ];

  collections.forEach(({ model, tableName }) => {
    model.watch().on('change', (change) => {
      if (change.operationType === 'insert' || change.operationType === 'update') {
        console.log(`Change detected in ${tableName}:`, change);
        io.emit('notification', { table: tableName, data: change.fullDocument });
      }
    });
  });
};
watchCollections();

// Test notification endpoint (non-production only)
if (!isProduction) {
  app.get('/test-notification', (req, res) => {
    io.emit('notification', { table: 'PPEKit', data: { test: 'Manual notification' } });
    res.send('Test notification sent');
  });
}

// Start the server
// server.listen(port, () => {
//   console.log(`Server is running on ${isProduction ? 'production' : 'development'} mode at http://localhost:${port}`);
// });

module.exports = app;
