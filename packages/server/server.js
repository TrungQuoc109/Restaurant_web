//import libary
import express from "express";
// import dotenv from "dotenv";
// import { route } from "./src/router/route.js";
// import cors from "cors";
// import { database } from "./src/datasource/index.js";
// import options from "./src/docs/swagger.js";
// import SwaggerUI from "swagger-ui-express";
// // -----------------------------------------------
// dotenv.config();
const PORT = process.env.PORT ?? 5999;

// // -----------------------------------------------
const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// route(app);

// //use swagger
// app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(options));

// // -----------------------------------------------
// //disconnect database ....
// process.on("SIGINT", function () {
//     database.close(function () {
//         console.log(
//             "Mongoose default connection disconnected through app termination"
//         );
//         process.exit(0);
//     });
// });
app.get("/", function (req, res) {
    console.log("ok");
});

app.listen(PORT, () => {
    console.log(
        `⚡️[Todo_Sample]: Server is running at http://localhost:${PORT}`
    );
});
