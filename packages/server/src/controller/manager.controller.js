import { managerServiceInstance } from "../service/index.js";

export class ManagerController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ManagerController();
        }
        return this.instance;
    }
    async getEmployee(req, res) {
        return await managerServiceInstance.getEmployee(req, res);
    }
    async getEmployeeDetail(req, res) {
        return await managerServiceInstance.getEmployeeDetail(req, res);
    }
    async addEmployee(req, res) {
        return await managerServiceInstance.addEmployee(req, res);
    }
    async updateemployee(req, res) {
        return await managerServiceInstance.updateemployee(req, res);
    }
    async deleteEmployee(req, res) {
        return await managerServiceInstance.deleteEmployee(req, res);
    }
    async getCustomer(req, res) {
        return await managerServiceInstance.getCustomer(req, res);
    }
    async deleteCustomer(req, res) {
        return await managerServiceInstance.deleteCustomer(req, res);
    }
}
export const managerControllerInstance = ManagerController.getInstance();
