import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.JWT_KEY ?? "local";
const checkAuth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token.split(" ")[1], key, (err, account) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.account = account;
        //console.log(req.account);
        next();
    });
};

const checkAdmin = (req, res, next) => {
    if (req.account && req.account.role.data == 1) {
        next();
    } else {
        res.status(403).send("You do not have access to the admin page.");
    }
};
const checkLogin = (req, res, next) => {
    if (req.account) {
        res.status(303).json({ message: "See orther" });
    } else {
        next();
    }
};

export { checkAdmin, checkAuth, checkLogin };
