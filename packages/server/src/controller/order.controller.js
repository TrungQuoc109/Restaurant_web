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
    async getOrderOfCustomer(req, res) {
        return await orderServiceInstance.getOrderOfCustomer(req, res);
    }
    async getTakeOutOrderDetail(req, res) {
        return await orderServiceInstance.getTakeOutOrderDetail(req, res);
    }
    async getReservationOrderDetail(req, res) {
        return await orderServiceInstance.getReservationOrderDetail(req, res);
    }
    async getOrderByAdmin(req, res) {
        return await orderServiceInstance.getOrderByAdmin(req, res);
    }
}
export const orderControllerInstance = OrderController.getInstance();
