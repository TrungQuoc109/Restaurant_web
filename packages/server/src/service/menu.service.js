import { Item, ItemImages } from "../model/index.model.js";
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
                attributes: ["id", "name", "price", "category"],
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
            const item = await Item.findOne({
                where: { id: id },
                raw: true,
            });
            item.image = await ItemImages.findOne({
                where: { item_id: id },
                raw: true,
            });
            if (item.image)
                item.image.imageData = item.image.imageData.toString("base64");
            if (item) {
                return res.status(200).json(item);
            } else {
                return res.status(404).json({ message: "Item not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async updateItem(req, res) {
        try {
            const imageBuffer = req.file && req.file.buffer;
            const id = req.params.id;
            const item = Item.findByPk(id);
            if (!item) {
                return res.status(404).json({ message: "Item not found!" });
            }
            const updateData = {
                name: req.body.name ?? item.name,
                description: req.body.description ?? item.description,
                category: req.body.category ?? item.category,
                price: req.body.price ?? item.price,
                unit: req.body.unit ?? item.unit,
            };
            await Item.update(updateData, { where: { id: id } });
            if (imageBuffer) {
                const savedImage = await ItemImages.create({
                    item_id: id,
                    imageData: imageBuffer,
                });
            }
            res.status(201).json({ message: "Item updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const menuServiceInstance = MenuService.getInstance();
