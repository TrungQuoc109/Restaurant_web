//import libary
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { route } from "./src/route/index.js";
import jwt from "jsonwebtoken";
import { sequelize } from "./src/database/index.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
dotenv.config();
const PORT = process.env.PORT ?? 5999;

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(urlencoded({ extended: true }));
app.use(express.json());
route(app);

app.listen(PORT, () => {
    console.log(
        `⚡️[Restaurant_web]: Server is running at http://localhost:${PORT}`
    );
});
