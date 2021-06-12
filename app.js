// Require Statements
require("./configurations");
require("colors")
require("ejs");

// Import Statements
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const cors = require("cors");
const routes = require("./routes/routes.api");
const passport = require("passport");
const session = require("cookie-session");
const bodyParser = require("body-parser");

// Constants
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("short"))
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');
app.use(session({
    keys: ['test-key', 'test-key-2'],
    name: 'session'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

// Listening
const port = process.env.PORT || 3000;
const mode = !!parseInt(process.env.PRODMODE) ? 'Production' : "Development";
const mongoUri = mode === 'Production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/sleepDB';

(async () => {
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        app.listen(port, () => {
            console.log(`[SERVER] Listening On Port ${port} In ${mode} Mode`.yellow.underline);
        })
    } catch (error) {
        console.log(error.message);
        console.log("[ERROR] Something Went Wrong! Debug Quick!".red)
    }
})()