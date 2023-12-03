import { Router } from "express";
import { AccountControllerInstance } from "../controller/index.js";
import { checkAuth, checkLogin } from "../middleware/middleware.js";
const accountRoute = Router();

accountRoute.post("/login", checkLogin, AccountControllerInstance.login);
accountRoute.post("/register", AccountControllerInstance.register);

export default accountRoute;
