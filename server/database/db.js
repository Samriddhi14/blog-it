import mongoose from "mongoose";

export const Connection = async () => {
    const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blogs.2vlif.mongodb.net/?retryWrites=true&w=majority&appName=blogs`;
    try {
        await mongoose.connect(URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting with the database ", error);
    }
};

export default Connection;
