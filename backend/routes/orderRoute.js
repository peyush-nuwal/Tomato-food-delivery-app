import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verfiyOrder ,userOrder,listOrder,updateStatus} from '../controllers/OrderController.js'; 

//providing order route
const orderRouter=express.Router();


orderRouter.post('/place',authMiddleware,placeOrder)
orderRouter.post('/verify',verfiyOrder)
orderRouter.post('/userOrders',authMiddleware,userOrder)
orderRouter.get('/list',listOrder)
orderRouter.post('/status',updateStatus)




export default orderRouter
