import { tableServiceInstance } from "../service/index.js";

export class TableController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new TableController();
        }
        return this.instance;
    }
    async addTable(req, res) {
        return await tableServiceInstance.addTable(req, res);
    }
    async getTable(req, res) {
        return await tableServiceInstance.getTable(req, res);
    }
}
export const tableControllerInstance = TableController.getInstance();
