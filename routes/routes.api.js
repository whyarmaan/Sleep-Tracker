const AuthRouter = require("./Auth.api");
const SleepRouter = require("./Sleep.api");
const Router = require("express").Router();
const ServeFiles = require("./servefiles");

Router.use("/auth", AuthRouter);
Router.use("/sleep", SleepRouter);
Router.use("/", ServeFiles);

module.exports = Router