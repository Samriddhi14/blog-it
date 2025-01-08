import express from "express";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use('/', Router);

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
Connection();