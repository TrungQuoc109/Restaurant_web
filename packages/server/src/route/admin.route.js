import { Router } from "express";
import {
    menuControllerInstance,
    tableControllerInstance,
} from "../controller/index.js";
import multer from "multer";
import { checkAdmin, checkAuth } from "../middleware/checkAccount.js";
import { managerControllerInstance } from "../controller/manager.controller.js";
const upload = multer();
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
adminRoute.post(
    "/updateitem/:id",
    checkAdmin,
    upload.single("image"),
    menuControllerInstance.updateItem
);
adminRoute.get(
    "/getEmployee",
    checkAuth,
    checkAdmin,
    managerControllerInstance.getEmployee
);
export default adminRoute;
