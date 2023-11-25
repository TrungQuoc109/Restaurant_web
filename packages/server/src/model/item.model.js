import { sequelize } from "../database/index.js";
import { Sequelize, DataTypes } from "sequelize";

const Item = sequelize.define(
    "Item",
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
        description: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: "Item",
        tableName: "Item",
        timestamps: false,
    }
);

export { Item };
