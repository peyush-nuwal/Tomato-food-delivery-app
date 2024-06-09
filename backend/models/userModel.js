import moongoose from "mongoose";

const userScema=moongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
         cartData:{type:Object,default:{}},

    },{minimize:false})
const userModel=moongoose.models.user||moongoose.model("user",userScema)


export default userModel