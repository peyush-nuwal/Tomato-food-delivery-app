import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
     


//order place for food
const placeOrder = async (req, res) => {
    const frontendUrl = `https://tomato-food-delivery-app-six.vercel.app`
    //
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100,

                },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: "delivery chargers",
                    },
                unit_amount:   50*100,
                
                },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({ success: true, session_url: session.url})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "something went wrong while payment" })
    }
}



const verfiyOrder=async(req,res)=>{ 
       const {orderId,success}=req.body;
       try {
         
       if(success=='true'){
       await orderModel.findByIdAndUpdate(orderId,{payment:true})
     res.json({success:true,message:"paid"})
       }
       else{
         await orderModel.findByIdAndUpdate(orderId)
         res.json({success:false,message:"not paid"})
        }
       }
        catch (error) {
         console.log(error)
         res.json({success:false,message:"payment failed"})
       }

 }  

//get user orders data
 const userOrder=async(req,res)=>{
    try {
        const userId=req.body.userId
        const order=await orderModel.find({userId:userId})
        res.json({success:true,data:order})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error fetch getting order"})
    }
 }

//listing orders for admin panel
const listOrder=async(req,res)=>{
     try {
        const order=await orderModel.find({});
        res.json({success:true,data:order})
     } catch (error) {
        console.log(error)
         res.json({success:false,message:"error fetching all orders"})
     }  

}
 

//api for updating status
const updateStatus=async(req,res)=>{
       try {
          const orderId=req.body.orderId;
          await orderModel.findByIdAndUpdate(orderId,{status:req.body.status})
          res.json({success:true,message:"status updated"})
       } catch (error) {
          console.log(error)
          res.json({success:false,message:"error while updating staus"})
       }
}
export { placeOrder,verfiyOrder,userOrder ,listOrder,updateStatus}