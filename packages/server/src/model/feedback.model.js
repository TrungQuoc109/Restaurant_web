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
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Cunstomer",
                key: "id",
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
        },
    },
    {
        modelName: "Feedback",
        tableName: "Feedback",
        timestamps: false,
    }
);
export { Feedback };
