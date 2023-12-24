import {
    Account,
    Customer,
    TakeOutOrder,
    TakeOutOrderDetail,
    Reservation,
    ReservationOrderDetail,
} from "../model/index.model.js";
import moment from "moment";
import bcrypt from "bcrypt";
import { Op, Sequelize } from "sequelize";
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
            if (!customer) {
                res.status(404).json({ message: "Customer not found!" });
            }
            const account = await Account.findByPk(req.account.id);
            customer.name = req.body.name ?? customer.name;
            customer.phone = req.body.phone ?? customer.phone;
            customer.save();
            account.password =
                (await bcrypt.hash(req.body.password, 10)) ?? account.password;
            account.save();
            req.account.password = req.body.password;
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
            const order = await TakeOutOrder.create({
                customer_ID: cus.id,
                address: req.body.address,
                note: req.body.note ?? "",
                status: 0,
                shippingMethod: req.body.shippingMethod,
                paymentType: req.body.paymentType,
            });
            const item_list = req.body.item;
            const detailsPromises = item_list.map(async (item) => {
                return await TakeOutOrderDetail.create({
                    item_id: item.id,
                    order_id: order.id,
                    quantity: item.quantity ?? 1,
                    note: item.item_note ?? "",
                });
            });

            await Promise.all(detailsPromises);
            const takeOut_Oder = await TakeOutOrder.findOne({
                where: { id: order.id },
                raw: true,
            });
            takeOut_Oder.item = await TakeOutOrderDetail.findAll({
                attributes: ["item_id", "quantity", "note", "amount"],
                where: { order_id: takeOut_Oder.id },
            });
            takeOut_Oder.order_date = moment(takeOut_Oder.order_date).format(
                "DD/MM/YYYY HH:mm"
            );
            return res.status(200).json({ takeOut_Oder });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async reservation(req, res) {
        try {
            const maxsize = 20;

            const cus = await Customer.findOne({
                where: { account_ID: req.account.id },
            });

            const appointmentMoment = moment(
                req.body.appointment_time,
                "HH:mm"
            );
            const oneHourBefore = moment(appointmentMoment)
                .subtract(1, "hour")
                .format("HH:mm");
            const oneHourAfter = moment(appointmentMoment)
                .add(1, "hour")
                .format("HH:mm");

            const totalGuestsWithinOneHour = await Reservation.sum(
                "number_of_guests",
                {
                    where: Sequelize.literal(
                        `\`Reservation\`.\`appointment_date\` = '${req.body.appointment_date}' AND TIME(appointment_time) BETWEEN TIME('${oneHourBefore}') AND TIME('${oneHourAfter}')`
                    ),
                }
            );

            if (
                maxsize - totalGuestsWithinOneHour <
                req.body.number_of_guests
            ) {
                return res.status(429).json({
                    message:
                        "Exceeded the maximum number of guests within this time range.",
                });
            }

            const order = await Reservation.create({
                customer_ID: cus.id,
                number_of_guests: req.body.number_of_guests,
                appointment_date: req.body.appointment_date,
                appointment_time: req.body.appointment_time,
                note: req.body.note ?? "",
                status: 0,
            });

            if (order) {
                return res.status(200).json({
                    message: "Reservation successfully created.",
                    order: order,
                });
            }
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async addItemtoReservation(req, res) {
        const order_id = req.params.id;
        const item_list = req.body.item;
        if (!item_list || !Array.isArray(item_list) || item_list.length === 0) {
            return res.status(200).json({
                message: "Reservation successfully created.",
                order: order,
            });
        }
        const detailsPromises = item_list.map(async (item) => {
            return ReservationOrderDetail.create({
                item_id: item.id,
                order_id: order_id,
                quantity: item.quantity ?? 1,
                note: item.item_note ?? "",
            });
        });
        await Promise.all(detailsPromises);
        const reservation_Oder = await Reservation.findOne({
            where: { id: order_id },
            raw: true,
        });
        reservation_Oder.order_date = moment(
            reservation_Oder.order_date
        ).format("DD/MM/YYYY HH:mm");
        reservation_Oder.appointment_date = moment(
            reservation_Oder.appointment_date
        ).format("DD/MM/YYYY");
        reservation_Oder.item_list = await ReservationOrderDetail.findAll({
            attributes: ["item_id", "quantity", "note", "amount"],
            where: {
                order_id: reservation_Oder.id,
            },
        });
        return res.status(200).json({
            message: "Add food successfully",
            order: reservation_Oder,
        });
    }
}

export const customerServiceInstance = CustomerService.getInstance();
