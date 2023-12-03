import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { TakeOutOrderDetail } from "./takeoutOrderDetail.model.js";

const TakeOutOrder = sequelize.define(
    "TakeOutOrder",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_ID: {
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
            defaultValue: sequelize.NOW,
        },
        note: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        model: "TakeOutOrder",
        tableName: "TakeOutOrder",
        timestamps: false,
    }
);
TakeOutOrder.hasMany(TakeOutOrderDetail, {
    foreignKey: "order_id",
});
export { TakeOutOrder };
