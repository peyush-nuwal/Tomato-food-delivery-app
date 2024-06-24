import express from "express"
import cors from "cors"
import {connectToDB} from "./config/db.js"
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";

//app config
const app=express()
const port=process.env.PORT ||4000;

//db connection 
connectToDB();

//middleware
app.use(cors())

// api endpoints
app.use(express.json())
app.use(express.static('public'));
app.use("/api/food",foodRouter)
app.use("/image",express.static("uploads"))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.get("/",(req,res)=>{
    res.send("API working hahaha")
})


;




//favicon error


  app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
  });


