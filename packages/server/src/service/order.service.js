import {
    Item,
    Reservation,
    ReservationOrderDetail,
    TakeOutOrder,
    TakeOutOrderDetail,
} from "../model/index.model.js";
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
        try {
            const takeoutOrders = await TakeOutOrder.findAll({
                attributes: ["id", "order_date", "address", "note", "status"],
                raw: true,
            });
            const reservationOrders = await Reservation.findAll({
                attributes: [
                    "id",
                    "order_date",
                    "note",
                    "status",
                    "appointment_date",
                    "appointment_time",
                ],
                raw: true,
            });

            const combinedOrders = takeoutOrders
                .map((order) => {
                    order.order_date = moment(order.order_date).format(
                        "DD/MM/YYYY HH:mm:ss"
                    );
                    order.order_type = "takeout";
                    return order;
                })
                .concat(
                    reservationOrders.map((order) => {
                        order.order_date = moment(order.order_date).format(
                            "DD/MM/YYYY HH:mm:ss"
                        );
                        order.order_type = "reservation";
                        return order;
                    })
                );
            combinedOrders.sort(
                (a, b) => new Date(b.order_date) - new Date(a.order_date)
            );

            console.log(combinedOrders);
            return res.status(200).send(combinedOrders);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getOrderOfCustomer(req, res) {
        try {
            const takeoutOrders = await TakeOutOrder.findAll({
                attributes: [
                    "id",
                    "order_date",
                    "address",
                    "note",
                    "totalprice",
                    "status",
                ],
                where: { customer_id: req.params.id },
                raw: true,
            });
            const reservationOrders = await Reservation.findAll({
                attributes: [
                    "id",
                    "order_date",
                    "note",
                    "appointment_date",
                    "appointment_time",
                    "totalprice",
                    "status",
                ],
                where: { customer_id: req.params.id },
                raw: true,
            });

            const combinedOrders = takeoutOrders
                .map((order) => {
                    order.order_date = moment(order.order_date).format(
                        "DD/MM/YYYY HH:mm:ss"
                    );
                    order.order_type = "takeout";
                    return order;
                })
                .concat(
                    reservationOrders.map((order) => {
                        order.order_date = moment(order.order_date).format(
                            "DD/MM/YYYY HH:mm:ss"
                        );
                        order.order_type = "reservation";
                        return order;
                    })
                );
            combinedOrders.sort(
                (a, b) => new Date(b.order_date) - new Date(a.order_date)
            );

            console.log(combinedOrders);
            return res.status(200).send(combinedOrders);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getTakeOutOrderDetail(req, res) {
        try {
            const id = req.params.id;

            const order_detail = await TakeOutOrder.findOne({
                attributes: [
                    "id",
                    "order_date",
                    "address",
                    "note",
                    "totalprice",
                    "status",
                ],
                where: { id: id },
                raw: true,
            });
            if (!order_detail) {
                return res
                    .status(404)
                    .json({ message: " Takeout order not found" });
            }
            //  console.log(order_detail.order_date);
            order_detail.order_date = moment(order_detail.order_date).format(
                "DD/MM/YYYY HH:mm"
            );
            order_detail.detail = await TakeOutOrderDetail.findAll({
                attributes: ["quantity", "note", "amount"],
                where: { order_id: id },
                include: {
                    model: Item,
                    attributes: ["id", "name", "price"],
                },
            });
            return res.status(200).json({ order_detail });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getReservationOrderDetail(req, res) {
        try {
            const id = req.params.id;
            const order_detail = await Reservation.findOne({
                attributes: [
                    "id",
                    "customer_ID",
                    "table_ID",
                    "order_date",
                    "number_of_guests",
                    "appointment_date",
                    "appointment_time",
                    "note",
                    "totalprice",
                    "status",
                ],
                where: { id: id },
                raw: true,
            });
            if (!order_detail) {
                return res.status(404).json({ message: "Order not found" });
            }

            order_detail.order_date = moment(order_detail.order_date).format(
                "DD/MM/YYYY"
            );
            order_detail.appointment_date = moment(
                order_detail.appointment_date
            ).format("DD/MM/YYYY");
            order_detail.detail = await ReservationOrderDetail.findAll({
                attributes: ["quantity", "note", "amount"],
                where: { order_id: id },
                include: {
                    model: Item,
                    attributes: ["id", "name", "price"],
                },
            });
            return res.status(200).json({ order_detail });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async updateOrder(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
export const orderServiceInstance = orderService.getInstance();
