import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { TakeOutOrder, Item } from "./index.model.js";

const TakeOutOrderDetail = sequelize.define(
    "TakeOutOrderDetail",
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
                model: "TakeOutOrder",
                key: "id",
            },
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        note: {
            type: DataTypes.TEXT,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        modelName: "TakeOutOrderDetail",
        tableName: "TakeOutOrderDetail",
        timestamps: false,
    }
);
TakeOutOrderDetail.belongsTo(Item, { foreignKey: "item_id" });
export { TakeOutOrderDetail };
