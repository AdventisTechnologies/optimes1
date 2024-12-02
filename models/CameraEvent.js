const mongoose2 = require('mongoose');

const CameraEvent = new mongoose2.Schema({
    EventID:{
        type:String,
        unique:true,
        required:[true,'EventID should be manadory']
    },
    CameraIPandImage:{
        CameraIP:{
            type:String,
            unique:true,
            required:[true,'CameraIP should be manadory']
        },
        CameraImage:{
            type:String,
            unique:true,
            required:[true,'CameraImage should be manadory']
        },
    },
    Timestamp:{
            type:String,
            unique:true,
            required:[true,'Timestamp should be manadory']
    },
    EventType:{
            type:String,
            unique:true,
            required:[true,'EventType should be manadory']
    },
    EventDuration:{
        type:String,
        unique:true,
        required:[true,'EventDuration should be manadory']
},
EventLocation:{
    type:String,
    unique:true,
    required:[true,'EventLocation should be manadory']
},
Action:{
    type:String,
    unique:false,
    required:[false,'Action should be manadory']
},
});
module.exports = mongoose2.model('CameraEventData',CameraEvent)