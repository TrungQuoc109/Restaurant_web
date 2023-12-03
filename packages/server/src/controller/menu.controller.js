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
    async getItemDetail(req, res) {
        return await menuServiceInstance.getItemDetail(req, res);
    }
}
export const menuControllerInstance = MenuController.getInstance();
