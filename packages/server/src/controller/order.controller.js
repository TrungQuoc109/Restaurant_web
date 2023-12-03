import { orderServiceInstance } from "../service/index.js";

export class OrderController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new OrderController();
        }
        return this.instance;
    }
    async getOrder(req, res) {
        return await orderServiceInstance.getOrder(req, res);
    }
    async getTakeOutOrderDetail(req, res) {
        return await orderServiceInstance.getTakeOutOrderDetail(req, res);
    }
}
export const orderControllerInstance = OrderController.getInstance();
