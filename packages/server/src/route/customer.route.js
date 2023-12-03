import { Router } from "express";
import { CustomerControllerInstance } from "../controller/index.js";
import { checkAuth } from "../middleware/middleware.js";
const customerRoute = Router();

customerRoute.get("/", checkAuth, CustomerControllerInstance.getProfile);
customerRoute.post(
    "/updateprofile",
    checkAuth,
    CustomerControllerInstance.updateProfile
);
customerRoute.post(
    "/takeoutOrder",
    checkAuth,
    CustomerControllerInstance.takeoutOrder
);

export default customerRoute;
