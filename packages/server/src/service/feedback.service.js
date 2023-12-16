import { Feedback } from "../model/index.model.js";
import moment from "moment";
export class Feedbackservice {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new Feedbackservice();
        }
        return this.instance;
    }
    async createFeedback(req, res) {
        try {
            const feedback = await Feedback.create({
                customer_id: req.account.id,
                content: req.body.content,
            });
            if (feedback) return res.status(200).json(feedback);
            return res
                .status(400)
                .json({ message: "Invalid or missing data." });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getFeedback(req, res) {
        try {
            const feedbackList = await Feedback.findAll({
                raw: true,
            });
            if (!feedbackList || feedbackList.length === 0)
                return res.status(500).json({ message: "No feedback found" });
            const updatedFeedbackList = feedbackList.map((feedback) => {
                return {
                    ...feedback,
                    date: moment(feedback.date).format("DD/MM/YYYY HH:mm:ss"),
                };
            });
            return res.status(200).json(updatedFeedbackList);
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getFeedbackOfCustomer(req, res) {
        try {
            const feedbackOfCustomer = await Feedback.findAll({
                where: {
                    customer_id: req.params.id,
                },
                raw: true,
            });
            if (!feedbackOfCustomer || feedbackOfCustomer.length === 0)
                return res
                    .status(500)
                    .json({ message: "No feedback found for the customer" });
            const updatedFeedbackList = feedbackOfCustomer.map((feedback) => {
                return {
                    ...feedback,
                    date: moment(feedback.date).format("DD/MM/YYYY HH:mm:ss"),
                };
            });
            return res.status(200).json(updatedFeedbackList);
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async updatedFeedback(req, res) {
        try {
            const feedback = await Feedback.findOne({
                where: { id: req.params.id },
            });
            if (!feedback)
                return res.status(404).json({ message: "Feedback not found!" });
            feedback.content = req.body.content;
            await feedback.save();
            return res.status(200).json(feedback);
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async deleteFeedback(req, res) {
        const FeedbackId = req.params.id;

        try {
            const existingFeedback = await Feedback.findByPk(FeedbackId);

            if (!existingFeedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            await existingFeedback.destroy();
            return res
                .status(200)
                .json({ message: "Feedback deleted successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const feedbackserviceInstance = Feedbackservice.getInstance();
