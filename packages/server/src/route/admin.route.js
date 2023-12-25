import { Router } from "express";
import {
    menuControllerInstance,
    orderControllerInstance,
    tableControllerInstance,
} from "../controller/index.js";
import multer from "multer";
import { checkAdmin, checkAuth } from "../middleware/checkAccount.js";
import { managerControllerInstance } from "../controller/manager.controller.js";
import { isInfoEmployee } from "../middleware/invalidInfo.js";
const storage = multer.memoryStorage(); // Lưu trữ file trong bộ nhớ
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024, // Giới hạn kích thước tệp (đơn vị: byte)
    },
});
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
adminRoute.put(
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
    managerControllerInstance.deleteEmployee
);
adminRoute.get(
    "/getCustomer",
    checkAuth,
    checkAdmin,
    managerControllerInstance.getCustomer
);
adminRoute.delete(
    "/deleteCustomer/:id",
    checkAuth,
    checkAdmin,
    managerControllerInstance.deleteCustomer
);

adminRoute.get(
    "/orders",
    checkAuth,
    checkAdmin,
    orderControllerInstance.getOrderByAdmin
);
adminRoute.post(
    "/additem",
    checkAuth,
    checkAdmin,
    upload.single("image"),
    menuControllerInstance.addItem
);
export default adminRoute;
