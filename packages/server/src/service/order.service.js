import moment from "moment";
import {
    Item,
    Customer,
    Reservation,
    TakeOutOrder,
    ReservationOrderDetail,
    TakeOutOrderDetail,
} from "../model/index.model.js";

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

            //    console.log(combinedOrders);
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
    async getOrderByAdmin(req, res) {
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
                include: {
                    model: Customer,
                    attributes: ["name"],
                },
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
                include: {
                    model: Customer,
                    attributes: ["name"],
                },
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
            return res.status(200).send(combinedOrders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async updateOrder(req, res) {
        try {
            const orderId = req.params.id;
            const type = req.params.type;

            // Lấy thông tin đơn đặt hàng cần cập nhật
            const existingOrder =
                type === "takeout"
                    ? await TakeOutOrder.findByPk(orderId)
                    : await Reservation.findByPk(orderId);

            if (!existingOrder) {
                return res.status(404).json({ message: "Order not found" });
            }

            // Cập nhật thông tin đơn đặt hàng
            if (type === "takeout") {
                // Cập nhật thông tin đơn đặt hàng mang đi
                await existingOrder.update({
                    // Cập nhật các trường thông tin cần thiết
                    // Ví dụ: existingOrder.address = req.body.address;
                    // Nếu có các trường cần cập nhật, bạn thêm vào đây
                });
            } else {
                // Cập nhật thông tin đơn đặt hàng đặt bàn
                await existingOrder.update({
                    // Cập nhật các trường thông tin cần thiết
                    // Ví dụ: existingOrder.appointment_date = req.body.appointment_date;
                    // Nếu có các trường cần cập nhật, bạn thêm vào đây
                });
            }

            return res
                .status(200)
                .json({ message: "Order updated successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;
            const type = req.params.type;

            const existingorder =
                type == "takeout"
                    ? await TakeOutOrder.findByPk(orderId)
                    : await Reservation.findByPk(orderId);

            if (!existingorder) {
                return res.status(404).json({ message: "order not found" });
            }
            await existingorder.destroy();
            return res.status(200);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
export const orderServiceInstance = orderService.getInstance();
