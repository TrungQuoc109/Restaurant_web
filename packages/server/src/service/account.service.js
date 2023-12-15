import { Account, Customer, Employee } from "../model/index.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const key = process.env.JWT_KEY ?? "local";
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
            const account = await Account.findOne({
                where: { username },
                raw: true,
            });
            if (account) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    account.password
                );
                console.log(account);
                const user =
                    account.role == 0
                        ? await Customer.findOne({
                              where: { account_ID: account.id },
                              raw: true,
                          })
                        : await Employee.findOne({
                              where: {
                                  account_ID: account.id,
                              },
                              raw: true,
                          });
                if (passwordMatch) {
                    const token = jwt.sign(
                        {
                            id: account.id,
                            username: account.username,
                            password: password,
                            role: account.role,
                            user_id: user.id,
                        },
                        key,
                        { expiresIn: "24h" }
                    );
                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ message: "Login failed" });
                }
            } else {
                res.status(401).json({ message: "Login failed" });
            }
        } catch (error) {
            //    console.error("Error during login:", error);
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
            const token = jwt.sign(
                {
                    id: newUser.id,
                    username: newUser.username,
                    password: register.password,
                    role: newUser.role,
                    customer_id: customer.id,
                },
                key,
                { expiresIn: "24h" }
            );
            res.status(200).json({ token });
        } catch (error) {
            // console.error("Error during registration:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const accountServiceInstance = accountService.getInstance();
