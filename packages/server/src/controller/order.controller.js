import * as service from "../service/index.js";

export class OrderController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new OrderController();
        }
        return this.instance;
    }
    async getOrder(req, res) {
        return await service.orderServiceInstance.getOrder(req, res);
    }
    async takeoutOrder(req, res) {
        return await service.orderServiceInstance.takeoutOrder(req, res);
    }
}
export const orderControllerInstance = OrderController.getInstance();
