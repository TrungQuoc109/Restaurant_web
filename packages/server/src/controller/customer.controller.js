import * as service from "../service/index.js";

export class CustomerController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CustomerController();
        }
        return this.instance;
    }
    async getProfile(req, res) {
        return await service.customerServiceInstance.getProfile(req, res);
    }
    async updateProfile(req, res) {
        return await service.customerServiceInstance.updateProfile(req, res);
    }
    async takeoutOrder(req, res) {
        return await service.customerServiceInstance.takeoutOrder(req, res);
    }
}
export const CustomerControllerInstance = CustomerController.getInstance();
