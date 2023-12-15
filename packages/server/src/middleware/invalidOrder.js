import moment from "moment";
const checkReservationOrder = (req, res, next) => {
    const { appointment_date, appointment_time, table_ID, number_of_guests } =
        req.body;
    //const customer_ID = req.account.customer_id;
    if (
        !appointment_date ||
        !appointment_time ||
        !table_ID ||
        !customer_ID ||
        !number_of_guests
    )
        return res.status(400).json({ message: "Missing or invalid data." });
    const currentDate = new Date();
    const formatDate = moment(appointment_date, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
    );
    const appointmentDateTime = new Date(`${formatDate}T${appointment_time}`);
    if (isNaN(appointmentDateTime) || appointmentDateTime < currentDate) {
        return res.status(400).json({
            message: "Invalid appointment date.",
        });
    }

    const appointmentHours = appointmentDateTime.getHours();
    const appointmentMinutes = appointmentDateTime.getMinutes();

    if (
        appointmentHours < 16 ||
        (appointmentHours === 16 && appointmentMinutes < 15) ||
        appointmentHours > 21 ||
        (appointmentHours === 21 && appointmentMinutes > 30)
    ) {
        return res.status(400).json({
            message: "Invalid appointment time.",
        });
    }
    if (isNaN(table_ID)) {
        return res.status(400).json({ message: "Invalid table_ID." });
    }

    // Check if customer_ID is a valid number
    if (isNaN(customer_ID)) {
        return res.status(400).json({ message: "Invalid customer_ID." });
    }

    // Check if number_of_guests is a valid number
    if (isNaN(number_of_guests)) {
        return res.status(400).json({
            message: "Invalid number_of_guests.",
        });
    }
    next();
};
const checkTakeoutOrder = (req, res, next) => {
    const { address, item } = req.body;
    const customer_ID = req.account.user_id;
    if (!customer_ID || !address || !item) {
        return res.status(400).json({ message: "Missing or invalid data." });
    }
    if (isNaN(customer_ID)) {
        return res.status(400).json({ message: "Invalid customer_ID." });
    }
    const addressRegex =
        /^[a-zA-Z0-9\s,'-\u{0041}-\u{007A}\u{00C0}-\u{1EF9}]+$/u;
    if (!addressRegex.test(address)) {
        return res.status(400).json({
            message: "Invalid Address",
        });
    }
    if (!item || !Array.isArray(item) || item.length === 0) {
        return res.status(201).json({ message: "Invalid list item" });
    }
    next();
};
export { checkReservationOrder, checkTakeoutOrder };
