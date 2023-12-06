const isAccount = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    }
    const username_len = username.length;
    const password_len = password.length;
    if (
        username_len < 8 ||
        username_len > 20 ||
        password_len < 8 ||
        password_len > 20
    )
        return res.status(400).json({
            message: `Username or password must be between 8 and 20 characters.`,
        });
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password) || !usernameRegex.test(username)) {
        return res.status(400).json({
            message: "Invalid username or password.",
        });
    }
    next();
};
const isInfoCustomer = (req, res, next) => {
    const nameRegex = /^[a-zA-Z ]+$/;
    const phoneRegex = /^(?:\+84|0)(?:\d{9}|\d{10})$/;
    const { name, phone, password } = req.body;
    if (!name || !phone) {
        return res
            .status(400)
            .json({ message: "name and phone are required." });
    }
    if (!nameRegex.test(name) || !phoneRegex.test(phone)) {
        return res.status(400).json({
            message: "Invalid name or phone.",
        });
    }
    if (password) {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Invalid password.",
            });
        }
    }
    next();
};
const isInfoEmployee = (req, res, next) => {
    const addressRegex = /^[a-zA-Z0-9\s,'-]+$/;
    const salaryRegex = /^\d+(\.\d{1,2})?$/;
    const idCardRegex = /^\d{12}$/;
    const positionRange = ["Waiter", "Chef", "Manager"];
    const nameRegex = /^[a-zA-Z ]+$/;
    const phoneRegex = /^(?:\+84|0)(?:\d{9}|\d{10})$/;

    const { name, phone } = req.body;
    if (!name || !phone) {
        return res
            .status(400)
            .json({ message: "name and phone are required." });
    }
    if (!nameRegex.test(name) || !phoneRegex.test(phone)) {
        return res.status(400).json({
            message: "Invalid name or phone.",
        });
    }

    if (!addressRegex.test(address)) {
        return res.status(400).json({
            message: "Invalid Information",
        });
    }

    if (!idCardRegex.test(idCardNumber)) {
        return res.status(400).json({
            message: "Invalid Information.",
        });
    }

    if (!positionRange.includes(position)) {
        return res.status(400).json({
            message: "Invalid Information.",
        });
    }

    if (!salaryRegex.test(salary) || parseFloat(salary) < 0) {
        return res.status(400).json({
            message: "Invalid Information",
        });
    }
    next();
};

export { isAccount, isInfoCustomer, isInfoEmployee };
