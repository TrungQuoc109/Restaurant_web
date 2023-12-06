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
}
export const managerControllerInstance = ManagerController.getInstance();
