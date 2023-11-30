import { Router } from "express";
import * as controller from "../controller/index.js";
import { checkAdmin, checkAuth, checkLogin } from "../middleware/checkLogin.js";
const orderRoute = Router();
orderRoute.get("/", checkAdmin, controller.orderControllerInstance.getOrder);
export default orderRoute;
