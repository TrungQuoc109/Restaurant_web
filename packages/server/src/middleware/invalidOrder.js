const checkReservationOrder = (req, res, next) => {
    const {
        appointment_date,
        appointment_time,
        table_ID,
        customer_ID,
        number_of_guests,
        note,
    } = req.body;
    if (
        !appointment_date ||
        !appointment_time ||
        !table_ID ||
        !customer_ID ||
        !number_of_guests
    )
        return res.status(400).json({ message: "Missing or invalid data." });
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
    const { customer_ID, address, item } = req.body;
    if (!customer_ID || !address || !item) {
        return res.status(400).json({ message: "Missing or invalid data." });
    }
    if (isNaN(customer_ID)) {
        return res.status(400).json({ message: "Invalid customer_ID." });
    }
    const addressRegex = /^[a-zA-Z0-9\s,'-]+$/;
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
