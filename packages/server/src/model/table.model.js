import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Table = sequelize.define(
    "Table",
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
            type: DataTypes.STRING,
            allowNullValues: false,
        },
    },
    {
        modelName: "Table",
        tableName: "Table",
        timestamps: false,
    }
);
export { Table };
