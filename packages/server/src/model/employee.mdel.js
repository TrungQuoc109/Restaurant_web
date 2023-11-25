import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Employee = sequelize.define(
    "Employee",
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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aitizenID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manager_ID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Employee",
                key: "id",
            },
        },
    },
    {
        modelName: "Employee",
        tableName: "Employee",
        timestamps: false,
    }
);
export { Employee };
