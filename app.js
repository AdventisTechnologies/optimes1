const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');



app.use(express.static(path.join(__dirname, 'dist', 'opti-mes')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'opti-mes','browser' ,'index.html'));
});


// Import Routes
const EmployeeRoute = require('./routes/Employee');
const CamereRoute = require('./routes/Camera');
const CamereEventRoute = require('./routes/CamereEvents');
const ppeRoutes = require('./routes/ppeRoutes'); // Use relative path
const userRoutes = require('./routes/user');
const cameraFire = require('./routes/fire');
const restrictroute = require('./routes/restrictRoute');
const unauthorisedroute = require('./routes/unauthorisedRoute');


// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from your Angular app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
}));

// Middleware for parsing JSON bodies
app.use(express.json());  // This replaces the body-parser.json() middleware

// Routes
app.use('/api/user', EmployeeRoute);  // Routes for user
app.use('/api/user', CamereRoute);    // Routes for cameras
app.use('/api/user', CamereEventRoute); // Routes for camera events
app.use('/api/ppe', ppeRoutes); // Use the correct variable
app.use('/api/getppeKits', ppeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fire', cameraFire);
app.use('/api', cameraFire);
app.use('/api/user', restrictroute); 
app.use('/api/user', unauthorisedroute); 
app.use(function(req, res, next) {
  res.setTimeout(60000, () => {  // 60000ms = 60 seconds
    console.log('Request has timed out');
    res.status(500).send('Request timeout');
  });
  next();
});

module.exports = app;
