import { Router } from "express";
import { orderControllerInstance } from "../controller/index.js";
import { checkAdmin, checkAuth } from "../middleware/middleware.js";
import { checkType } from "../middleware/checktypeOrder.js";
const orderRoute = Router();
orderRoute.get("/", checkAuth, checkAdmin, orderControllerInstance.getOrder);
orderRoute.get(
    "/:id/:type",
    checkAuth,
    checkAdmin,
    checkType,
    orderControllerInstance.getTakeOutOrderDetail
);
export default orderRoute;
