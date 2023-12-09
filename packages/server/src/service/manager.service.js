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
    async getEmployeeDetail(req, res) {
        try {
            const employee = await Employee.findOne({
                where: {
                    id: req.params.id,
                },
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
    async getEmployeeOfPosition(req, res) {
        try {
            const employee = await Employee.findAll({
                where: {
                    position: req.params.position,
                },
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

    async addEmployee(req, res) {
        try {
            const { name, phone, address, aitizenID, salary, position } =
                req.body;

            const existingEmployee = await Employee.findOne({
                where: {
                    name: name,
                    phone: phone,
                    address: address,
                    aitizenID: aitizenID,
                },
            });
            if (existingEmployee) {
                return res
                    .status(400)
                    .json({ message: "Employee already exists" });
            }
            const employee = await Employee.create({
                name: name,
                phone: phone,
                address: address,
                aitizenID: aitizenID,
                position: position,
                salary: parseFloat(salary),
                manager_ID: req.account.user_id,
            });
            if (!employee)
                return res
                    .status(400)
                    .json({ message: "Employee creation failed" });
            return res.status(200).json(employee);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async updateemployee(req, res) {
        const employeeId = req.params.id;

        try {
            const existingEmployee = await Employee.findByPk(employeeId);
            console.log(existingEmployee);
            if (!existingEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            const {
                name,
                phone,
                address,
                aitizenID,
                salary,
                position,
                manager_ID,
            } = req.body;

            existingEmployee.name = name;
            existingEmployee.phone = phone;
            existingEmployee.address = address;
            existingEmployee.aitizenID = aitizenID;
            existingEmployee.position = position;
            existingEmployee.manager_ID = manager_ID;
            existingEmployee.salary = salary;
            await existingEmployee.save();
            return res.status(200).json({
                existingEmployee,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async deleteEmployee(req, res) {
        const employeeId = req.params.id;

        try {
            const existingEmployee = await Employee.findByPk(employeeId);

            if (!existingEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            await existingEmployee.destroy();
            return res
                .status(200)
                .json({ message: "Employee deleted successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const managerServiceInstance = ManagerService.getInstance();
