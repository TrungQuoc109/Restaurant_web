import { accountServiceInstance } from "../service/index.js";

export class AccountController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new AccountController();
        }
        return this.instance;
    }
    async login(req, res) {
        return await accountServiceInstance.login(req, res);
    }
    async register(req, res) {
        return await accountServiceInstance.register(req, res);
    }
}
export const AccountControllerInstance = AccountController.getInstance();
