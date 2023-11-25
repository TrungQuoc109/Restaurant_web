import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Feedback = sequelize.define(
    "Feedback",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        modelName: "Feedback",
        tableName: "Feedback",
        timestamps: false,
    }
);
export { Feedback };
