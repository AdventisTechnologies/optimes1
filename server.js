//  const app = require('./app')
//  const mongoose = require('mongoose');
//  require('dotenv').config();

//  mongoose.connect(process.env.MONGODB)
//  .then(()=>{
//    console.log('MongoDB connected');
//  }).catch((error)=>{
//    console.error('MongoDB connection error:', error);  // Log detailed error
//  });
 
// const PORT = process.env.PORT || 3000;

// app.listen( PORT,'0.0.0.0',()=>{
//     console.log(`Server is Running On Port ${PORT}`);
// }
// );






// const app = require('./app'); 
// const mongoose = require('mongoose'); 
// require('dotenv').config(); 

// const http = require('http').createServer(app);
// const io = require('socket.io')(http, {
//   cors: {
//     origin: 'http://localhost:4200',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   },
// });

// // MongoDB connection
// mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');

//     // Watch for database changes using change streams
//     const db = mongoose.connection;

//     // Ensure the collection exists before watching
//     const changeStream = db.collection('EmployeeData').watch();
//     console.log('Change stream set up for EmployeeData');

//     // When a change occurs, emit an event via Socket.IO
//     changeStream.on('change', (change) => {
//       console.log('Database change detected:', change);
//       const changeData = {
//         operationType: change.operationType,
//         documentKey: change.documentKey,
//         fullDocument: change.fullDocument,
//       };
//       io.emit('dbChange', changeData); // Broadcast change to all connected clients
//     });

//     changeStream.on('error', (error) => {
//       console.error('Error in change stream:', error);
//     });
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

// // Clean up on application exit
// process.on('SIGINT', async () => {
//   // Ensure that changeStream is defined before attempting to close it
//   if (changeStream) {
//     await changeStream.close(); // Close the change stream if needed
//   }
//   await mongoose.connection.close(); 
//   console.log('MongoDB connection closed.'); 
//   process.exit(0);
// });

// // Set up port and server listener
// const PORT = process.env.PORT || 3000;
// http.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is Running On Port ${PORT}`);
// });






const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const http = require('http').createServer(app);
const io = require('socket.io')(http); // Attach Socket.IO to the HTTP server
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MangoDB Connected');
  })
  .catch((error) => console.error('MongoDB connection error:', error));
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
