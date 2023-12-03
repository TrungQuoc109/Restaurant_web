import { Item } from "../model/index.model.js";
export class MenuService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new MenuService();
        }
        return this.instance;
    }
    async getMenu(req, res) {
        try {
            const menu = await Item.findAll({
                //attributes: ["id", "name", "price", "unit"],
                raw: true,
            });
            return res.status(200).json(menu);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getItemDetail(req, res) {
        try {
            const id = req.params.id;
            const item = await Item.findByPk(id);
            if (item) {
                return res.status(200).json(item);
            } else {
                return res.status(404).json({ message: "Item not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const menuServiceInstance = MenuService.getInstance();
