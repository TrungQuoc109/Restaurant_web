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
                include: {
                    model: ItemImages,
                    attributes: ["imageData"],
                },
                raw: true,
            });
            const menuWithImages = menuItem.map((item) => ({
                ...item,
                imageData: item.ItemImage
                    ? item.ItemImage.imageData.toString("base64")
                    : null,
            }));
            return res.status(200).json(menuWithImages);
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
                const existingImage = await ItemImages.findOne({
                    where: { item_id: id },
                });
                if (existingImage) {
                    existingImage.imageData = imageBuffer;
                    await existingImage.save();
                } else {
                    const savedImage = await ItemImages.create({
                        item_id: id,
                        imageData: imageBuffer,
                    });
                }
            }
            res.status(201).json({ message: "Item updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const menuServiceInstance = MenuService.getInstance();
