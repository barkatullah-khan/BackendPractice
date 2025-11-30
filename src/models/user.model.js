import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength:1,
            maxLength:30,
            index: true // Makes searching faster
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        
            trim:true
        },
        password:{
            type:String,
            required:[true,'Password is required!'],
            minLength:8,
            maxLength:80

        },

    },
    {
        timestamps:true
    }
);
export const User=mongoose.model('User',userSchema);