//Mongoose model let us to use data from mongodb 
//following is User model using mongoose and defining proper Schema for it

const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    
    
    },
    correct_answer:{
        type:Number,
        required:false
    }
});
const User=mongoose.model('user',UserSchema);
module.exports=User;