import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    sessionID: {
        type: Number,
        required: true,
    }, 
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }, 
    lead: {
        type: String,
        required: true,
    },
    assistant1: {
        type: String,
        required: false,
    },
    assistant2: {
        type: String,
        required: false,
    },
});

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
    startDay:{
            type:String,
            required:true
    },
    date:{
        type:String,
        required:true
    },
    nextSession:{
            type:String,
            required:true
    },
    confirmed:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    notes:{
        type:String,
        required:false
    },
    session: {
        type: [sessionSchema],
        required: false,
    }

},{timestamps:true})






const scheduleModel= mongoose.model('schedule',scheduleSchema)
const sessionModel= mongoose.model('session',sessionSchema)

export {scheduleModel, sessionModel}