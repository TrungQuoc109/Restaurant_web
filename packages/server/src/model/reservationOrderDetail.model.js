import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { TakeOutOrder, Reservation } from "./index.model.js";

const ReservationOrderDetail = sequelize.define(
    "ReservationOrderDetail",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Item",
                key: "id",
            },
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Reservation",
                key: "id",
            },
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        note: DataTypes.TEXT,
        amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        modelName: "ReservationOrderDetail",
        tableName: "ReservationOrderDetail",
        timestamps: false,
    }
);

export { ReservationOrderDetail };
