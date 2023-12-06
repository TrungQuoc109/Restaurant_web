import { customerServiceInstance } from "../service/index.js";

export class CustomerController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CustomerController();
        }
        return this.instance;
    }
    async getProfile(req, res) {
        return await customerServiceInstance.getProfile(req, res);
    }
    async updateProfile(req, res) {
        return await customerServiceInstance.updateProfile(req, res);
    }
    async takeoutOrder(req, res) {
        return await customerServiceInstance.takeoutOrder(req, res);
    }
    async reservation(req, res) {
        return await customerServiceInstance.reservation(req, res);
    }
}
export const CustomerControllerInstance = CustomerController.getInstance();
