import Item from "../model/item.model.js";
export const route = (app) => {
    app.get("/", async (req, res) => {
        try {
            const items = await Item.findByPk(4);
            // items.forEach((item) => {
            //     console.log("Item:", item.toJSON());
            // });
            res.json(items);
        } catch (error) {
            console.error("Error fetching items:", error.message);
        }
    });
};
