import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const db = process.env.DATABASE ?? "restaurant_web";
const host = process.env.HOST ?? "localhost";
const username = process.env.USERNAME_DB ?? "root";
const password = process.env.PASSWORD_DB ?? "";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: host,
    username: username,
    password: password,
    database: db,
    // define: {
    //     timestamps: false,
    // },
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000,
    // },
    // dialectOptions: {
    //     timeout: 30000, // Thời gian chờ lock (milliseconds)
    // },
});

// Kiểm tra kết nối
sequelize
    .authenticate()
    .then(() => {
        console.log("Kết nối thành công.");
    })
    .catch((err) => {
        console.error("Không thể kết nối:", err);
    });

export { sequelize };
