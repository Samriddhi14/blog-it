import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
    constructor() {
        this.connection = null;
        this.instance = null;
    }

    async connect() {
        if (this.connection) {
            return this.connection; 
        }
        const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blogs.2vlif.mongodb.net/?retryWrites=true&w=majority&appName=blogs`;
        try {
            this.connection = await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("Database connected successfully");
            return this.connection;
        } catch (error) {
            console.error("Error while connecting with the database", error);
            throw error;
        }
    }

    static getDbInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
}

export default Database;
