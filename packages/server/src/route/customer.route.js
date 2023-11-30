import { Router } from "express";
import * as controller from "../controller/index.js";
import { checkAuth } from "../middleware/checkLogin.js";
const customerRoute = Router();

customerRoute.get(
    "/",
    checkAuth,
    controller.CustomerControllerInstance.getProfile
);
customerRoute.post(
    "/updateprofile",
    checkAuth,
    controller.CustomerControllerInstance.updateProfile
);
customerRoute.post(
    "/takeoutOrder",
    checkAuth,
    controller.CustomerControllerInstance.takeoutOrder
);

export default customerRoute;
