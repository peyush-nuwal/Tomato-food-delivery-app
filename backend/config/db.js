import mongoose from 'mongoose';

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
           
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }
};