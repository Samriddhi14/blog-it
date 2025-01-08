import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Database from './database/db.js'; // Import the Database class
import Router from './routes/route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT = process.env.PORT || 8000;

(async () => {
    try {
        const dbInstance = Database.getDbInstance();
        await dbInstance.connect();
        console.log("Database is ready");
    } catch (error) {
        console.error("Failed to initialize the database:", error);
    }
})();

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
