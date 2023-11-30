import * as service from "../service/index.js";

export class AccountController {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new AccountController();
        }
        return this.instance;
    }
    async login(req, res) {
        return await service.accountServiceInstance.login(req, res);
    }
    async register(req, res) {
        return await service.accountServiceInstance.register(req, res);
    }
    async logout(req, res) {
        return await service.accountServiceInstance.logout(req, res);
    }
}
export const AccountControllerInstance = AccountController.getInstance();
