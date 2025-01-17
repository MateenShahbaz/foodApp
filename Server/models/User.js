import mongoose from "mongoose";


const userScheema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    }, 
    password:{
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


export const User = mongoose.model('user', userScheema);