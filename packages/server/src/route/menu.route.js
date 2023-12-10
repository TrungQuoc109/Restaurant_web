import { Router } from "express";
import { menuControllerInstance } from "../controller/index.js";

const menuRoute = Router();
menuRoute.get("/", menuControllerInstance.getMenu);
menuRoute.get("/:id", menuControllerInstance.getItemDetail);

export default menuRoute;