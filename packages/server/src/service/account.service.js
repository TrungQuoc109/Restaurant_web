import { Account, Customer } from "../model/index.model.js";
import bcrypt from "bcrypt";
export class accountService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new accountService();
        }
        return this.instance;
    }
    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const account = await Account.findOne({ where: { username } });
            // console.log(account);
            if (account) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    account.password
                );

                if (passwordMatch) {
                    req.session.user = account;
                    req.session.user.password = password;
                    res.status(200).json({ message: "Login successful!" });
                } else {
                    res.status(401).json({ message: "Login failed" });
                }
            } else {
                res.status(401).json({ message: "Login failed" });
            }
        } catch (error) {
            console.error("Error during login:", error);

            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async register(req, res) {
        const register = {
            username: req.body.username,
            password: req.body.password,
            customer_name: req.body.name,
            phone: req.body.phone,
        };

        try {
            const existingUser = await Account.findOne({
                where: { username: register.username },
            });
            if (existingUser) {
                res.status(400).json({ message: "Username already exists" });
                return;
            }

            const hashedPassword = await bcrypt.hash(register.password, 10);
            const newUser = await Account.create({
                username: register.username,
                password: hashedPassword,
                role: 0,
            });
            const customer = await Customer.create({
                name: register.customer_name,
                account_ID: newUser.id,
                phone: register.phone,
            });
            req.session.user = newUser;

            res.status(201).json({ message: "User registered successfully!" });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                res.status(500).json({ message: "Internal Server Error" });
            } else {
                res.status(200).json({ message: "Logout" });
            }
        });
    }
}

export const accountServiceInstance = accountService.getInstance();
