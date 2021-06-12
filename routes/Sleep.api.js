const Sleep = require("../controllers/Sleep");
const { Router } = require("express");
const SleepRouter = Router();
const isAuth = require("../handlers/isAuth");

SleepRouter.get("/all", isAuth, Sleep.getAll);
SleepRouter.get("/create-new", isAuth, Sleep.getCreateOne);
SleepRouter.post("/create-new", isAuth, Sleep.createNew);
SleepRouter.get("/one/:id", isAuth, Sleep.getone);
SleepRouter.get("/delete/:id", isAuth, Sleep.deleteOne);
SleepRouter.get("/edit/:id", isAuth, Sleep.getUpdateExisting);
SleepRouter.post("/edit/post/:id", isAuth, Sleep.updateExisting);

module.exports = SleepRouter;
