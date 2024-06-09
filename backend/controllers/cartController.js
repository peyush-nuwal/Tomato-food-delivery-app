
import userModel from "../models/userModel.js";


const addToCart = async (req, res) => {
    try {

        //finding user by ID
        let userData = await userModel.findById( req.body.userId);
        
        let cartData = await userData.cartData
      

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }

                
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
              
        res.json({ success: true, messsage: "add to cart successfully" })
    } catch (error) {
        console.log(error)

        res.json({ success: false, messsage: "error while adding to cart " })
    }

}

const removeFromCart = async (req, res) => {
       
    try {
         let userData =await userModel.findById(req.body.userId);
         let cartData =  await userData.cartData
         if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
             
         
         }
         await userModel.findByIdAndUpdate(req.body.userId, { cartData })
         return res.json({success:true,message:"removed from cart successfully"})


    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"error while removing from cart"})
    }
}


const getCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
         let cartData = await userData.cartData
          
         res.json({success:true,data:cartData})
         
         
        
    } catch (error) {
        res,json({success:false,message:"error while getting cart Data"})
    }

}


export { addToCart, removeFromCart, getCart };