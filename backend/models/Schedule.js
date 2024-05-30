import mongoose from "mongoose";

const scheduleSchema= new mongoose.Schema({
    SrNo:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }, 
    programName:{
        type:String,
        required:true
    },
    programID:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    startDay:{
            type:Number,
            required:true
    },
    nextSession:{
            type:Number,
            required:true
    },
    confirmed:{
        type:Number,
        required:true
    },
    lastNumber:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    sessionsAfterToday:{
        type:Number,
        required:true
    },
    notes:{
        type:String,
        required:true
    },



},{timestamps:true})


const scheduleModel= mongoose.model('schedule',scheduleSchema)

export default scheduleModel