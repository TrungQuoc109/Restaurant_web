import { Account, Customer, TakeOutOrder } from "../model/index.model.js";
import bcrypt from "bcrypt";
export class CustomerService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CustomerService();
        }
        return this.instance;
    }
    async getProfile(req, res) {
        try {
            const customer = await Customer.findOne({
                where: { account_ID: req.session.user.id },
            });
            const cus = customer.toJSON();
            cus.password = req.session.user.password;
            if (customer) {
                res.status(200).json(cus);
            } else res.status(404).json({ message: "Not found!" });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async updateProfile(req, res) {
        try {
            const customer = await Customer.findOne({
                where: { account_ID: req.session.user.id },
            });
            const account = await Account.findByPk(req.session.user.id);
            if (!customer) {
                res.status(404).json({ message: "Customer not found!" });
            }
            customer.name = req.body.name ?? customer.name;
            customer.phone = req.body.phone ?? customer.phone;
            customer.save();
            if (req.body.password) {
                account.password =
                    (await bcrypt.hash(req.body.password, 10)) ??
                    account.password;
                account.save();
                req.session.user.password = req.body.password;
            }
            res.status(200).json({
                message: "Customer information updated successfully",
            });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async takeoutOrder(req, res) {
        //         {
        //     "address": "180 Cao Lỗ",
        //     "note":"something or not",
        //     "item":{
        //         "1":,
        //         "2":"món B",
        //         "3":"món C"
        //     }
        // }

        try {
            const now = new Date();
            const cus = await Customer.findOne({
                where: { account_ID: req.session.user.id },
            });

            const order = await TakeOutOrder.create({
                customer_ID: cus.id,
                address: req.body.address,
                note: req.body.note ?? "",
                status: 0,
            });
            const test = await TakeOutOrder.findByPk(order.id);
            console.log("Order ", test.toJSON());
            return res.status(200).json({ message: "tạo đơn thành công" });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async reservation(req, res) {}
    async feedback(req, res) {}
}

export const customerServiceInstance = CustomerService.getInstance();
