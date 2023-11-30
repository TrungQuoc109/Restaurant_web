const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("You need to log in to access this page.'.");
    }
};

const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role) {
        next();
    } else {
        res.status(403).send("You do not have access to the admin page.");
    }
};
const checkLogin = (req, res, next) => {
    if (req.session.user) {
        res.status(303).json({ message: "See orther" });
    } else {
        next();
    }
};
export { checkAdmin, checkAuth, checkLogin };
