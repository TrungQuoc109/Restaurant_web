import { feedbackserviceInstance } from "../service/index.js";

export class FeedbackController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new FeedbackController();
        }
        return this.instance;
    }
    async createFeedback(req, res) {
        return await feedbackserviceInstance.createFeedback(req, res);
    }
    async getFeedback(req, res) {
        return await feedbackserviceInstance.getFeedback(req, res);
    }
    async getFeedbackOfCustomer(req, res) {
        return await feedbackserviceInstance.getFeedbackOfCustomer(req, res);
    }
    async updatedFeedback(req, res) {
        return await feedbackserviceInstance.updatedFeedback(req, res);
    }
    async deleteFeedback(req, res) {
        return await feedbackserviceInstance.deleteFeedback(req, res);
    }
}

export const FeedbackControllerInstance = FeedbackController.getInstance();
