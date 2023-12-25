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
            const menuItem = await Item.findAll({
                attributes: ["id", "name", "price", "category"],
                raw: true,
            });

            return res.status(200).json(menuItem);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getMenubyAdmin(req, res) {
        try {
            const menuItem = await Item.findAll({
                raw: true,
            });

            return res.status(200).json(menuItem);
        } catch (error) {
            console.log(error);
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

            if (item) {
                item.image = await ItemImages.findOne({
                    attributes: ["imageData"],
                    where: { item_id: id },
                    raw: true,
                });
                if (item.image)
                    item.image.imageData =
                        item.image.imageData.toString("base64");
                return res.status(200).json(item);
            } else {
                return res.status(404).json({ message: "Item not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async addItem(req, res) {
        try {
            const imageBuffer = req.file && req.file.buffer;

            const newItem = await Item.create({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                unit: req.body.unit,
            });

            if (imageBuffer) {
                await ItemImages.create({
                    item_id: newItem.id,
                    imageData: imageBuffer,
                });
            }
            return res
                .status(201)
                .json({ message: "Item added successfully", newItem });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async updateItem(req, res) {
        try {
            const imageBuffer = req.file && req.file.buffer;
            const item_id = req.params.id;

            const item = await Item.findByPk(item_id);
            if (!item) {
                return res.status(404).json({ message: "Item not found!" });
            }
            const updateData = {
                name: req.body.name || item.name,
                description: req.body.description || item.description,
                category: req.body.category || item.category,
                price: req.body.price || item.price,
                unit: req.body.unit || item.unit,
            };
            console.log(updateData, "body", req.body);
            await Item.update(updateData, { where: { id: item_id } });
            if (imageBuffer) {
                const existingImage = await ItemImages.findOne({
                    where: { item_id: id },
                });
                if (existingImage) {
                    existingImage.imageData = imageBuffer;
                    await existingImage.save();
                } else {
                    await ItemImages.create({
                        item_id: item_id,
                        imageData: imageBuffer,
                    });
                }
            }
            res.status(201).json({ message: "Item updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }
}

export const menuServiceInstance = MenuService.getInstance();
