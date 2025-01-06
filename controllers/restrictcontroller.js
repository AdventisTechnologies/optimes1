const Occupancy = require('../models/restrict'); // Assuming your model file is named restrict.js

// Controller function to save occupancy data
exports.occupancyData = async (req, res) => {
    try {
        // Log the incoming request body (the occupancy data you're sending)
        console.log('Received occupancy data:', req.body);
        
        // Create a new occupancy data instance with the incoming request body
        const occupancyData = new Occupancy(req.body);

        // Save the occupancy data to the database
        await occupancyData.save();
        console.log('Data saved to database:', occupancyData);

        // Respond with the saved data and status 201
        res.status(201).json(occupancyData);
    } catch (error) {
        // Check if the error is due to validation
        if (error.name === 'ValidationError') {
            console.error('Validation Error:', error.message); // Detailed logging for validation errors
            return res.status(400).json({ error: 'Validation Error', details: error.errors });
        }

        // Log any other errors
        console.error('Error saving data:', error.message);
        res.status(500).json({ error: 'Failed to save data', message: error.message });
    }
};


/// Controller function to get all occupancy data
exports.getOccupancyData = async (req, res) => {
    try {
        // Fetch all occupancy data from the database
        const allOccupancyData = await Occupancy.find();

        // Respond with the retrieved data
        res.status(200).json(allOccupancyData);
    } catch (error) {
        // Handle any errors

        res.status(500).json({ error: 'Failed to fetch data', message: error.message });
    }
};


// exports.CamereEventsget = async (req,res) =>{
//     try{
//         const CamereEventsData = await CameraEventModel.find();
//         return res.status(200).json({message:'Succesfully Got',CamereEventsData})
//     }catch(error){
//        return res.status(500).json({message:'Internal Server Error',error})
//     }
//    };
