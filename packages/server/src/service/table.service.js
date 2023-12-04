import { Table } from "../model/index.model.js";
export class TableService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new TableService();
        }
        return this.instance;
    }
    async addTable(req, res) {
        try {
            // Insert 10 tables with capacity 4
            for (let i = 0; i < 10; i++) {
                await Table.create({
                    capacity: 4,
                    status: 1,
                });
            }

            // Insert 5 tables with capacity 8
            for (let i = 0; i < 5; i++) {
                await Table.create({
                    capacity: 8,
                    status: 1,
                });
            }

            // Insert 5 tables with capacity 12
            for (let i = 0; i < 5; i++) {
                await Table.create({
                    capacity: 12,
                    status: 1,
                });
            }

            return res
                .status(200)
                .json({ message: "Example data inserted successfully." });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getTable(req, res) {
        try {
            const table = await Table.findAll({
                raw: true,
            });
            //console.log(table);
            return res.status(200).json(table);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const tableServiceInstance = TableService.getInstance();
