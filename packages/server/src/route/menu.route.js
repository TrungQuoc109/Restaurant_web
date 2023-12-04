import { Router } from "express";
import { menuControllerInstance } from "../controller/index.js";
import multer from "multer";
const upload = multer();
const menuRoute = Router();
menuRoute.get("/", menuControllerInstance.getMenu);
menuRoute.get("/:id", menuControllerInstance.getItemDetail);
menuRoute.post(
    "/:id",
    upload.single("image"),
    menuControllerInstance.updateItem
);
export default menuRoute;
