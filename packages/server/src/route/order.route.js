import { Router } from "express";
import { orderControllerInstance } from "../controller/index.js";
import { checkAdmin, checkAuth } from "../middleware/checkAccount.js";

const orderRoute = Router();
orderRoute.get("/", checkAuth, checkAdmin, orderControllerInstance.getOrder);
orderRoute.get(
    "/:id",
    checkAuth,
    checkAdmin,
    orderControllerInstance.getOrderOfCustomer
);
orderRoute.get(
    "/:id/takeout",
    checkAuth,
    checkAdmin,
    orderControllerInstance.getTakeOutOrderDetail
);
orderRoute.get(
    "/:id/reservation",
    checkAuth,
    checkAdmin,
    orderControllerInstance.getReservationOrderDetail
);

export default orderRoute;
