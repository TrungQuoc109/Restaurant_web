import {
    Account,
    Customer,
    TakeOutOrder,
    TakeOutOrderDetail,
    Item,
    Reservation,
    ReservationOrderDetail,
} from "../model/index.model.js";
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
                where: { account_ID: req.account.id },
            });
            const cus = customer.toJSON();
            cus.password = req.account.password;
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
                where: { account_ID: req.account.id },
            });
            const account = await Account.findByPk(req.account.id);
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
                req.account.password = req.body.password;
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
        try {
            const cus = await Customer.findOne({
                where: { account_ID: req.account.id },
            });
            if (!cus)
                return res.status(404).json({ message: "Customer not found!" });

            if (!req.body.address) {
                return res.status(404).json({ message: "Address not found!" });
            }
            const order = await TakeOutOrder.create({
                customer_ID: cus.id,
                address: req.body.address,
                note: req.body.note ?? "",
                status: 0,
            });
            const item_list = req.body.item;

            if (
                !item_list ||
                !Array.isArray(item_list) ||
                item_list.length === 0
            ) {
                return res.status(201).json({ message: "Invalid list item" });
            }

            const detailsPromises = item_list.map(async (item) => {
                return TakeOutOrderDetail.create({
                    item_id: item.id,
                    order_id: order.id,
                    quantity: item.quantity ?? 1,
                    note: item.item_note ?? "",
                });
            });

            await Promise.all(detailsPromises);
            const takeOut_Oder = await TakeOutOrder.findOne({
                where: { id: order.id },
                include: [TakeOutOrderDetail],
            });
            return res.status(200).json({ takeOut_Oder });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async reservation(req, res) {
        try {
            try {
                const cus = await Customer.findOne({
                    where: { account_ID: req.account.id },
                });
                if (!req.body.address) {
                    return res
                        .status(404)
                        .json({ message: "Address not found!" });
                }
                const appointment_date =
                    req.body.appointment_date + req.body.appointment_time;
                formattedDate = moment(
                    appointment_date,
                    "DD/MM/YYYY HH:mm"
                ).format("YYYY-MM-DD HH:mm:ss");
                const order = await Reservation.create({
                    customer_ID: cus.id,
                    table_ID: req.body.table_ID,
                    appointment_date: appointment_date,
                    note: req.body.note ?? "",
                    status: 0,
                });
                const item_list = req.body.item;

                if (
                    !item_list ||
                    !Array.isArray(item_list) ||
                    item_list.length === 0
                ) {
                    return res
                        .status(400)
                        .json({ message: "Reservation successfully created." });
                }

                const detailsPromises = item_list.map(async (item) => {
                    return ReservationOrderDetail.create({
                        item_id: item.id,
                        order_id: order.id,
                        quantity: item.quantity ?? 1,
                        note: item.item_note ?? "",
                    });
                });

                await Promise.all(detailsPromises);
                const takeOut_Oder = await TakeOutOrder.findOne({
                    where: { id: order.id },
                    include: [ReservationOrderDetail],
                });
                return res.status(200).json({ takeOut_Oder });
            } catch (error) {
                console.log("Error: ", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        } catch (error) {}
    }
    async feedback(req, res) {}
}

export const customerServiceInstance = CustomerService.getInstance();
