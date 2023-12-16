import { Router } from "express";
import { CustomerControllerInstance } from "../controller/index.js";
import { checkAuth } from "../middleware/checkAccount.js";
import {
    checkReservationOrder,
    checkTakeoutOrder,
} from "../middleware/invalidOrder.js";
import { isInfoCustomer } from "../middleware/invalidInfo.js";
const customerRoute = Router();

customerRoute.get("/", checkAuth, CustomerControllerInstance.getProfile);
customerRoute.post(
    "/updateprofile",
    checkAuth,
    isInfoCustomer,
    CustomerControllerInstance.updateProfile
);
customerRoute.post(
    "/takeoutOrder",
    checkAuth,
    checkTakeoutOrder,
    CustomerControllerInstance.takeoutOrder
);
customerRoute.post(
    "/reservation",
    checkAuth,
    checkReservationOrder,
    CustomerControllerInstance.reservation
);

export default customerRoute;
