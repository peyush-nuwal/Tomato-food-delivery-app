import mongoose from "mongoose"

export const connectToDB =async ()=>{
     await mongoose.connect('mongodb+srv://songoku:thalaForReason@universe07.fyraszh.mongodb.net/?retryWrites=true&w=majority&appName=universe07').then(()=>{
        console.log("database connect sucessfully")
     }).catch((err)=>{
        console.log("unable to connect to db"+err)
     })
}


