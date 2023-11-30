import accountRoute from "./account.route.js";
import customerRoute from "./customer.route.js";
import orderRoute from "./order.route.js";
export const route = (app) => {
    app.use("/account", accountRoute);
    app.use("/customer", customerRoute);
    app.use("/order", orderRoute);
};
