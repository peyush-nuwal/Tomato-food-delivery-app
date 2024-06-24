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


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


export const handler = async (event, context) => {
  // Handle serverless function logic here, e.g., API endpoints
  const app = await import('./app.js');
  return app.handler(event, context);
};
//favicon error

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
  });
}

// 
