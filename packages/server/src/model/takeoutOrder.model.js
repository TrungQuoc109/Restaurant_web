import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const TakeOutOrder = sequelize.define(
    "TakeOutOrder",
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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order_date: {
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
        model: "TakeOutOrder",
        tableName: "TakeOutOrder",
        timestamps: false,
    }
);
export { TakeOutOrder };
