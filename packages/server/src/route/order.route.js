import { Router } from "express";
import { orderControllerInstance } from "../controller/index.js";
import { checkAdmin, checkAuth } from "../middleware/checkAccount.js";

const orderRoute = Router();
orderRoute.get("/", checkAuth, orderControllerInstance.getOrder);
orderRoute.get("/:id", checkAuth, orderControllerInstance.getOrderOfCustomer);
orderRoute.get(
    "/:id/takeout",
    checkAuth,

    orderControllerInstance.getTakeOutOrderDetail
);
orderRoute.get(
    "/:id/reservation",
    checkAuth,

    orderControllerInstance.getReservationOrderDetail
);
orderRoute.delete("/:id/:type", checkAuth, orderControllerInstance.deleteOrder);
export default orderRoute;
