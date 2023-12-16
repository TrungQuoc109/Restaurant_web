import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Table = sequelize.define(
    "RestaurantTable",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNullValues: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNullValues: false,
        },
    },
    {
        modelName: "Table",
        tableName: "RestaurantTable",
        timestamps: false,
    }
);
export { Table };
