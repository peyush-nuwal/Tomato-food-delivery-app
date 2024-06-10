import foodModel from "../models/foodModel.js";
import path from "path"
import fs from 'fs'

//add food item

const addFood= async(req,res)=>{
       
    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
         name:req.body.name,
         description:req.body.description,
         price:req.body.price,
         category:req.body.category,
         image:image_filename,
        })
        try {
            await food.save();
            res.json({success:true,message:"Food added successfully"})
            
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"error while adding food"})
            
        }
}

//all food list

const list_food=async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}

// remove food item


const deleteFood =async (req,res)=>{
  
    try{
        const foodId=req.params.id;

        const food=await foodModel.findById(foodId);

        if(!food){
             return res.json({success:false,message:"food item not found"})
            }
            const imagePath=path.resolve('uploads',food.image)
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
           
            await foodModel.findByIdAndDelete(foodId)

            res.json({success:true,message:"food deleted successfully"})
        }
        

    
    catch(error){
             console.log(error);
             res.json({success:false,message:"error while deleting food"})
    }
}




export {addFood,list_food,deleteFood}