import { Router } from "express";
import { FeedbackControllerInstance } from "../controller/index.js";
import { checkAuth } from "../middleware/checkAccount.js";
//import {} from "../middleware/invalidInfo.js";
const feedbackRoute = Router();

feedbackRoute.post("/", checkAuth, FeedbackControllerInstance.createFeedback);
feedbackRoute.post(
    "/:id",
    checkAuth,
    FeedbackControllerInstance.updatedFeedback
);

feedbackRoute.get("/", checkAuth, FeedbackControllerInstance.getFeedback);

feedbackRoute.get(
    "/:id",
    checkAuth,
    FeedbackControllerInstance.getFeedbackOfCustomer
);
feedbackRoute.delete(
    "/:id",
    checkAuth,
    FeedbackControllerInstance.deleteFeedback
);

export default feedbackRoute;
