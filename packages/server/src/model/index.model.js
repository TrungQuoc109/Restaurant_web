import { Customer } from "./customer.model.js";
import { Item } from "./item.model.js";
import { Reservation } from "./reservation.model.js";
import { TakeOutOrder } from "./takeoutOrder.model.js";

export * from "./account.model.js";
export * from "./customer.model.js";
export * from "./employee.model.js";
export * from "./feedback.model.js";
export * from "./item.model.js";
export * from "./reservation.model.js";
export * from "./table.model.js";
export * from "./takeoutOrder.model.js";
export * from "./ItemImage.model.js";
export * from "./takeoutOrderDetail.model.js";
export * from "./reservationOrderDetail.model.js";
// Trong file index.model.js
TakeOutOrder.belongsTo(Customer, { foreignKey: "customer_id" });
Reservation.belongsTo(Customer, { foreignKey: "customer_id" });
