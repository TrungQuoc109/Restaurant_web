import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Account = sequelize.define(
    "Account",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelName: "Account",
        tableName: "Account",
        timestamps: false,
    }
);
export { Account };
