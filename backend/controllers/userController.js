import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from  'validator'




///login user
const LoginUser=async(req,res)=>{
    const {email,password}=req.body;
     try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user doesn't exist"})
        }
         
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"incorrect password"})
        }
        const token=createToken(user._id)   ;

        res.json({success:true,token})
        
     } catch (error) {
         console.log(error)
         res.json({success:false,message:"something went wrong while logining"})       
     }
}

//creating token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

///register user
const registerUser=async(req,res)=>{
        const {name,email,password}=req.body;

        try {

            //checking if user already exists or not with email
            const exists=await userModel.findOne({email})
            if(exists){
                 return res.json({success:false,message:"user already exists"})
            }
             

            // validating emaill and strong password
              if(!validator.isEmail(email)){
                   return res.json({success:false,message:"please enter a valid email"})
              }


              if(password<6){
                 return res.json({success:false,message:"please enter a strong password"})
              }

              //hashing password
              const salt=await bcrypt.genSalt(10);
              const hashedPassword =await bcrypt.hash(password,salt);
              

              //new user
              const newUser=userModel({name:name,email:email,password:hashedPassword})

              const user =await newUser.save()
              const token=createToken(user._id)
              res.json({success:true,token})
                

        } catch (error) {
             console.log(error)
             res.json({success:false,message:"something went wrong"})
        }
}


export  {LoginUser,registerUser}