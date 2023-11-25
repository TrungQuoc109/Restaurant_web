import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Order = sequelize.define(
    "Order",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Employee",
                key: "id",
            },
        },
        table_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Table",
                key: "id",
            },
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        model: "Order",
        tableName: "Order",
        timestamps: false,
    }
);
export { Order };
