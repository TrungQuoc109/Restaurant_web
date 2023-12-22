import moment from "moment";
const checkReservationOrder = (req, res, next) => {
    const { appointment_date, appointment_time, number_of_guests, note } =
        req.body;
    console.log(req.body);
    const customer_ID = req.account.user_id;

    if (!appointment_date) {
        return res
            .status(400)
            .json({ message: "Missing or invalid appointment_date." });
    }

    if (!appointment_time) {
        return res
            .status(400)
            .json({ message: "Missing or invalid appointment_time." });
    }

    if (!customer_ID) {
        return res
            .status(400)
            .json({ message: "Missing or invalid customer_ID." });
    }

    if (!number_of_guests) {
        return res
            .status(400)
            .json({ message: "Missing or invalid number_of_guests." });
    }

    const currentDate = new Date();

    const appointmentDateTime = new Date(
        `${appointment_date}T${appointment_time}`
    );
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
