const Sleep = require("../controllers/Sleep");
const { Router: router } = require("express");
const Router = router();
const isAuth = require("../handlers/isAuth");

Router.get("/all", isAuth, Sleep.getAll);
Router.get("/:id", isAuth, Sleep.getOne);

module.exports = Router;
