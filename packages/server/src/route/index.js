import accountRoute from "./account.route.js";
import customerRoute from "./customer.route.js";
import orderRoute from "./order.route.js";
import menuRoute from "./menu.route.js";
import adminRoute from "./admin.route.js";
import feedbackRoute from "./feedback.route.js";
export const route = (app) => {
    app.use("/account", accountRoute);
    app.use("/customer", customerRoute);
    app.use("/order", orderRoute);
    app.use("/menu", menuRoute);
    app.use("/admin", adminRoute);
    app.use("/feedback", feedbackRoute);
};
