import { Employee } from "../model/index.model.js";
export class ManagerService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ManagerService();
        }
        return this.instance;
    }

    async getEmployee(req, res) {
        try {
            const employee = await Employee.findAll({
                raw: true,
            });
            if (!employee)
                return res.status(404).json({ message: "Employee not found" });
            return res.status(200).json(employee);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const managerServiceInstance = ManagerService.getInstance();
