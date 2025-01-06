const CamereModel = require('../models/CamereSchema');
module.exports = {
//   CameraPost: async (req, res) => {
//     console.log('Received request body:', req.body);
//     try {
//         const {
//             UserName,
//             Password,
//             CameraDetails,
//             CameraLocationName,
//             CameraLocationID,
//             LocationDescription,
//             IPAddress,
//             Port,
//             RTSPandRTMP,
//             CameraVisibility // Ensure this is correctly named
//         } = req.body;

//         const CameraData = new CamereModel({
//             UserName: UserName,
//             Password: Password,
//             CameraDetails: CameraDetails,
//             CameraLocationName: CameraLocationName,
//             CameraLocationID: CameraLocationID,
//             LocationDescription: LocationDescription,
//             IPAddress: IPAddress,
//             Port: Port,
//             RTSPandRTMP: RTSPandRTMP,
//             CameraVisibility: CameraVisibility // Correct field
//         });

//         await CameraData.save();
//         return res.status(200).json({ message: 'Successfully Registered' });
//     } catch (error) {
//         console.error('Error saving camera data:', error);  // Log the error
//         return res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// },
CameraPost: async (req, res) => {
  console.log('Received request body:', req.body);
  try {
      const {
          UserName,
          Password,
          CameraDetails,
          CameraLocationName,
          CameraLocationID,
          LocationDescription,
          IPAddress,
          Port,
          RTSPandRTMP,
          CameraVisibility
      } = req.body;

      // Check if CameraLocationID already exists
      const existingCamera = await CamereModel.findOne({ CameraLocationID });
      if (existingCamera) {
          return res.status(400).json({ message: 'CameraLocationID already exists' });
      }

      const CameraData = new CamereModel({
          UserName,
          Password,
          CameraDetails,
          CameraLocationName,
          CameraLocationID,
          LocationDescription,
          IPAddress,
          Port,
          RTSPandRTMP,
          CameraVisibility
      });

      await CameraData.save();
      return res.status(200).json({ message: 'Successfully Registered' });
  } catch (error) {
      console.error('Error saving camera data:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
},

      
      
    CamereGet: async (req,res) =>{
       try{
        const data =  await CamereModel.find();
           return res.status(200).json({message:'Succesfully Got',data})
       }catch(err){
        return res.status(500).json({err:'Internal Server Error'})
       }
    },
  //   CamereUpdate: async (req, res) => {
  //     try {
  //         const { id } = req.params;  // Extract the ID from the request parameters
  //         const data = req.body;  // Get the data to be updated from the request body
          
  //         // Check if CameraLocationID already exists in another document
  //         if (data.CameraLocationID) {
  //             const existingCamera = await CamereModel.findOne({ CameraLocationID: data.CameraLocationID });
  //             if (existingCamera && existingCamera._id.toString() !== id) {
  //                 return res.status(400).json({ message: 'CameraLocationID already exists' });  // Return error if CameraLocationID exists in another document
  //             }
  //         }
  
  //         // Use findByIdAndUpdate to update the document by its ID
  //         const updatedData = await CamereModel.findByIdAndUpdate(id, data, { new: true });
  
  //         if (!updatedData) {
  //             return res.status(404).json({ message: 'Camera not found' });  // Handle case where the document is not found
  //         }
  
  //         return res.status(200).json({ message: 'Successfully Updated', updatedData });  // Return success message with updated data
  //     } catch (err) {
  //         console.error('Error updating camera data:', err);  // Log the error for debugging
  //         return res.status(500).json({ error: 'Internal Server Error' });  // Return generic error message
  //     }
  // },
  CamereUpdate: async (req, res) => {
    try {
        const { id } = req.params;  // Extract the ID from the request parameters
        const data = req.body;  // Get the data to be updated from the request body

        // Check if CameraLocationID already exists and is different from the current document
        if (data.CameraLocationID) {
            const existingCamera = await CamereModel.findOne({ CameraLocationID: data.CameraLocationID });
            if (existingCamera && existingCamera._id.toString() !== id) {
                return res.status(400).json({ message: 'CameraLocationID already exists' });
            }
        }

        // Use findByIdAndUpdate to update the document by its ID
        const updatedData = await CamereModel.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Camera not found' });  // Handle case where the document is not found
        }

        return res.status(200).json({ message: 'Successfully Updated', updatedData });  // Return success message with updated data
    } catch (err) {
        console.error('Error updating camera data:', err);  // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });  // Return generic error message
    }
},

  
    CamereDelete: async(req,res)=>{
        try{
            await CamereModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({message:'Succesfully Deleted'})
        }catch(error){
            return res.status(500).json({err:'Internal Server Error'})
        }
    }
}