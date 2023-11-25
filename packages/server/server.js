//import libary
import express from "express";
import dotenv from "dotenv";
import { route } from "./src/route/index.js";

import { sequelize } from "./src/database/index.js";
// import options from "./src/docs/swagger.js";
// import SwaggerUI from "swagger-ui-express";
// // -----------------------------------------------
dotenv.config();
const PORT = process.env.PORT ?? 5999;

// // -----------------------------------------------
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);

// //use swagger
// app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(options));

app.listen(PORT, () => {
    console.log(
        `⚡️[Restaurant_web]: Server is running at http://localhost:${PORT}`
    );
});
