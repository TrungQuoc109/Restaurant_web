import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
const ItemImages = sequelize.define(
    "ItemImages",
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
        imageData: {
            type: DataTypes.BLOB("long"),
        },
    },
    {
        model: "ItemImages",
        tableName: "ItemImages",
        timestamps: false,
    }
);
export { ItemImages };
