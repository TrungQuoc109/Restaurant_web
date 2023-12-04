import { Router } from "express";
import { tableControllerInstance } from "../controller/index.js";
import { checkAdmin, checkAuth } from "../middleware/middleware.js";
const adminRoute = Router();
adminRoute.post(
    "/addtable",
    checkAuth,
    checkAdmin,
    tableControllerInstance.addTable
);
adminRoute.post(
    "/gettable",
    checkAuth,
    checkAdmin,
    tableControllerInstance.getTable
);
export default adminRoute;
