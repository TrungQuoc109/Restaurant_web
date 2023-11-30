import { Router } from "express";
import * as controller from "../controller/index.js";
import { checkAuth, checkLogin } from "../middleware/checkLogin.js";
const accountRoute = Router();

accountRoute.post(
    "/login",
    checkLogin,
    controller.AccountControllerInstance.login
);
accountRoute.post("/register", controller.AccountControllerInstance.register);
accountRoute.post(
    "/logout",
    checkAuth,
    controller.AccountControllerInstance.logout
);
export default accountRoute;
