import { Router } from "express";
import { AccountControllerInstance } from "../controller/index.js";
import { checkLogin } from "../middleware/checkAccount.js";
import { isAccount, isInfoCustomer } from "../middleware/invalidInfo.js";
const accountRoute = Router();

accountRoute.post(
    "/login",
    checkLogin,
    //isAccount,
    AccountControllerInstance.login
);
accountRoute.post(
    "/register",
    checkLogin,
    isAccount,
    isInfoCustomer,
    AccountControllerInstance.register
);

export default accountRoute;
