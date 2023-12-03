const checkType = (req, res, next) => {
    const type = req.params.type;
    if (type == "takeout") {
        next();
    } else return res.status(400).json({ message: "Invalid type" });
};
export { checkType };
