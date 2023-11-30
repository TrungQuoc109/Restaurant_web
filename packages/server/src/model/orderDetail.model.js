import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { TakeOutOrder, Reservation } from "./index.model.js";

const OrderDetail = sequelize.define(
    "OrderDetail",
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
        },
        order_id_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantiny: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        note: DataTypes.TEXT,
        amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        modelName: "OrderDetail",
        tableName: "OrderDetail",
        timestamps: false,
    }
);
OrderDetail.belongsTo(TakeOutOrder, {
    foreignKey: "order_id",
    targetKey: "id",
    constraints: false,
    scope: { order_id_type: "takeoutOrder" },
});
OrderDetail.belongsTo(Reservation, {
    foreignKey: "order_id",
    targetKey: "id",
    constraints: false,
    scope: { order_id_type: "reservation" },
});

export { OrderDetail };
