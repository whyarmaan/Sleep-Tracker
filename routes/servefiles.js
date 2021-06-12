const {Router} = require("express");
const ServeRouter = Router();

ServeRouter.get("/", (req, res, next) => {
    if(req.user) {
        return res.render("index.ejs", {user: req.user});
    } else {
        return res.render("index.ejs", {user: null})
    }
})

module.exports = ServeRouter;