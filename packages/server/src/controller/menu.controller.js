import { menuServiceInstance } from "../service/index.js";

export class MenuController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new MenuController();
        }
        return this.instance;
    }
    async getMenu(req, res) {
        return await menuServiceInstance.getMenu(req, res);
    }
    async getMenubyAdmin(req, res) {
        return await menuServiceInstance.getMenubyAdmin(req, res);
    }
    async getItemDetail(req, res) {
        return await menuServiceInstance.getItemDetail(req, res);
    }
    async addItem(req, res) {
        return await menuServiceInstance.addItem(req, res);
    }
    async updateItem(req, res) {
        return await menuServiceInstance.updateItem(req, res);
    }
}
export const menuControllerInstance = MenuController.getInstance();
