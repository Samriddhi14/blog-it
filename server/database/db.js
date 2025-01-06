import mongoose from "mongoose";

export const Connection = async(username, password) => {
    const uri = `mongodb+srv://${username}:${password}@newsinfi.69hjn22.mongodb.net/your-database?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error('Error while connecting to the database ', error);
    }
};
export default Connection;