const CameraEventModel = require('../models/CameraEvent')

module.exports = {
    CamereEventsPost : async (req,res) =>{
        try{
            const{EventID,CameraIP,CameraImage,Timestamp,EventType,EventDuration,EventLocation,Action} = req.body;
            const CameraEventData = new CameraEventModel({
                EventID :EventID,
                CameraIPandImage:{
                    CameraIP:CameraIP,
                    CameraImage:CameraImage,
                },
                Timestamp:Timestamp,
                EventType:EventType,
                EventDuration:EventDuration,
                EventLocation:EventLocation,
                Action:Action
            });
            await CameraEventData.save();
            return res.status(200).json({message:'Succesfully Registered'})
        }catch(error){
            return res.status(500).json({message:'Internal Server Error',error})
        }

    },

    
    CamereEventsget:async (req,res) =>{
     try{
         const CamereEventsData = await CameraEventModel.find();
         return res.status(200).json({message:'Succesfully Got',CamereEventsData})
     }catch(error){
        return res.status(500).json({message:'Internal Server Error',error})
     }
    },
    CamereEventsUpdate:async(req,res) =>{
        try{
         const {id} = req.params;
         const data = req.body;
         const CamereEvents = await CameraEventModel.findByIdAndUpfdate(id,data,{new:true})
         return res.status(200).json({message:'Succesfully Updated',CamereEvents})
        }catch(error){
            return res.status(500).json({message:'Internal Server Error',error})
        }
    },
    CamereEventsDelete:async(req,res) =>{
        try{
               await CameraEventModel.findByIdAndDelete(req.params.id)
               return res.status(200).json({message:'Succesfully Deleted'})
        }catch(error){
            return res.status(500).json({message:'Internal Server Error',error})
        }
    },
}