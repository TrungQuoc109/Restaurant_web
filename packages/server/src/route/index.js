import { database } from "../database/index.js";

export const route = (app) => {
    app.get("/", async (req, res) => {
        const account = database.collection("account");
        const listAccounts = await account.find().toArray();
        return res.send(listAccounts);
    });
};
