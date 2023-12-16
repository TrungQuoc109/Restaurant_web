const isAccount = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    }
    const username_len = username.length;
    const password_len = password.length;
    const usernameRegex = /^[a-zA-Z0-9_-]{8,20}$/;

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
    const nameRegex = /^[\p{L}\s]+$/u;
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
    const addressRegex =
        /^[a-zA-Z0-9\s,'-\u{0041}-\u{007A}\u{00C0}-\u{1EF9}]+$/u;
    const salaryRegex = /^\d+(\.\d{1,2})?$/;
    const aitizenIDRegex = /^\d{12}$/;
    const positionRange = ["Waiter", "Chef", "Manager"];
    const nameRegex = /^[\p{L}\s]+$/u;
    const phoneRegex = /^(?:\+84|0)(?:\d{9}|\d{10})$/;

    const { name, phone, address, aitizenID, salary, position } = req.body;
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
            message: "Invalid address",
        });
    }

    if (!aitizenIDRegex.test(aitizenID)) {
        return res.status(400).json({
            message: "Invalid idCard.",
        });
    }

    if (!positionRange.includes(position)) {
        return res.status(400).json({
            message: "Invalid position.",
        });
    }

    if (!salaryRegex.test(salary) || parseFloat(salary) < 0) {
        return res.status(400).json({
            message: "Invalid salary",
        });
    }
    next();
};

export { isAccount, isInfoCustomer, isInfoEmployee };
