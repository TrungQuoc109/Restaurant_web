import { Account, Customer, TakeOutOrder } from "../model/index.model.js";
import { Sequelize, Op } from "sequelize";
import moment from "moment";
export class orderService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new orderService();
        }
        return this.instance;
    }

    async getOrder(req, res) {
        const takeoutOrders = await TakeOutOrder.findAll({
            raw: true,
        });
        const orders = [];
        takeoutOrders.forEach((takeoutorder) => {
            const temp = takeoutorder;
            temp.order_date = moment(takeoutorder.order_date).format(
                "DD/MM/YYYY HH:mm:ss"
            );
            orders.push(temp);
        });
        return res.status(200).send(orders);
    }
    async register(req, res) {}
    async logout(req, res) {}
}
export const orderServiceInstance = orderService.getInstance();
