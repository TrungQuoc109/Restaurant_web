import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { ReservationOrderDetail } from "./reservationOrderDetail.model.js";

const Reservation = sequelize.define(
    "Reservation",
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
        table_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Table",
                key: "id",
            },
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
        },
        appointment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        appointment_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        number_of_guests: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        note: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalprice: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        model: "Reservation",
        tableName: "Reservation",
        timestamps: false,
    }
);
Reservation.hasMany(ReservationOrderDetail, {
    foreignKey: "order_id",
});
export { Reservation };
