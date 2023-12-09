import { Router } from "express";
import {
    menuControllerInstance,
    tableControllerInstance,
} from "../controller/index.js";
import multer from "multer";
import { checkAdmin, checkAuth } from "../middleware/checkAccount.js";
import { managerControllerInstance } from "../controller/manager.controller.js";
import { isInfoEmployee } from "../middleware/invalidInfo.js";
const upload = multer();
const adminRoute = Router();
adminRoute.post(
    "/addtable",
    checkAuth,
    checkAdmin,
    tableControllerInstance.addTable
);
adminRoute.get(
    "/gettable",
    checkAuth,
    checkAdmin,
    tableControllerInstance.getTable
);
adminRoute.post(
    "/updateitem/:id",
    checkAuth,
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
adminRoute.get(
    "/getEmployee/:id",
    checkAuth,
    checkAdmin,
    managerControllerInstance.getEmployeeDetail
);
adminRoute.post(
    "/addEmployee",
    checkAuth,
    checkAdmin,
    isInfoEmployee,
    managerControllerInstance.addEmployee
);
adminRoute.post(
    "/updateEmployee/:id",
    checkAuth,
    checkAdmin,
    isInfoEmployee,
    managerControllerInstance.updateemployee
);
adminRoute.delete(
    "/deleteEmployee/:id",
    checkAuth,
    checkAdmin,
    //isInfoEmployee,
    managerControllerInstance.deleteEmployee
);
export default adminRoute;
