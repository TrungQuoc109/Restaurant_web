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
            const capacity = req.body.capacity;
            if (!capacity || isNaN(capacity))
                return res.status(400).json({ message: "Invalid capacity" });
            const table = await Table.create({
                capacity: capacity,
                status: 0,
            });

            return res.status(200).json(table);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getTable(req, res) {
        try {
            const table = await Table.findAll({
                raw: true,
            });
            return res.status(200).json(table);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const tableServiceInstance = TableService.getInstance();
