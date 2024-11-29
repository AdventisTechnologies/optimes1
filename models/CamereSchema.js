const mongoose1 = require('mongoose');

const CameraSchema = new mongoose1.Schema({
    UserName: {
        type: String,
        required: false,
    },
    Password: {
        type: String,
        required: false,
    },
    CameraDetails: {
        type: String,
        required: false,
    },
    CameraLocationName: {
        type: String,
        required: false,
    },
    CameraLocationID: {
        type: String,
        unique: true,
        sparse: true, // Allows multiple null values without violating unique constraint
        required: false,
    },
    LocationDescription: {
        type: String,
        required: false,
    },
    IPAddress: {
        type: String,
        unique: true,
        sparse: true,
        required: false,
    },
    Port: {
        type: String,
        required: false,
    },
    RTSPandRTMP: {
        type: String,
        required: false,
    },
    CameraVisibility: {
        type: Boolean,
        required: true,
    },
});






module.exports = mongoose1.model('CameraData',CameraSchema)





    // CameraName:{
    //     type:String,
    //     unique: true,
    //     required:[true,'CameraName should be manadory']
    // },
    // CameraName:{
    //     type:String,
    //     unique: true,
    //     required:[true,'CameraName should be manadory']
    // },
    // CameraID:{
    //     type:String,
    //     unique: true,
    //     required:[true,'CameraID should be manadory']
    // },
    // CustomizeCamera:{
    //     CustomizeName:{
    //         type:String,
    //         unique: false,
    //         required:[true,'CustomizeName should be manadory'] 
    //     },
    //     CustomizeID:{
    //         type:String,
    //         unique: false,
    //         required:[true,'CustomizeID should be manadory'] 
    //     },  

    // },
    // IPAddress:{
    //     type:String,
    //     unique: true,
    //     required:[true,'IPAddress should be manadory'] 
    // },
    // PortAddress:{
    //     type:String,
    //     unique: true,
    //     required:[true,'PortAddress should be manadory'] 
    // },
    // UserName:{
    //     type:String,
    //     unique: true,
    //     required:[true,'UserName should be manadory'] 
    // },
    // Password:{
    //     type:String,
    //     unique: true,
    //     required:[true,'Password should be manadory'] 
    // },
    // Description:{
    //     type:String,
    //     unique: false,
    //     required:[true,'Description should be manadory'] 
    // },
    // RTSPandRTMP:{
    //     RTSP:{
    //         type:String,
    //         unique: false,
    //         required:[false,'RTSP should be manadory'] 
    //     },
    //     RTMP:{
    //         type:String,
    //         unique: false,
    //         required:[false,'RTMP should be manadory'] 
    //     }, 
    // },