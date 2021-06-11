const AuthRouter = require("./Auth.api");
const SleepRouter = require("./Sleep.api");
const Router = require("express").Router();

Router.use("/auth", AuthRouter);
Router.use("/sleep", SleepRouter);

module.exports = Router