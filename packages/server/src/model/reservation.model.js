import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Reservation = sequelize.define(
    "Reservation",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Customer",
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
        appointment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        model: "Reservation",
        tableName: "Reservation",
        timestamps: false,
    }
);
export { Reservation };
