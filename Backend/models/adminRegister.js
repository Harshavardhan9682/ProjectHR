const  mongoose=require("mongoose")

const admin=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    }
})

const  newAdmin=mongoose.model("admins",admin)
module.exports=newAdmin