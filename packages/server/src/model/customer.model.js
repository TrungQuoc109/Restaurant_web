import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Customer = sequelize.define(
    "Customer",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Account",
                key: "id",
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: "Customer",
        tableName: "Customer",
        timestamps: false,
    }
);
export { Customer };
