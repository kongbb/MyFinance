"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const indexRoute = require("./routes/index");
const passport = require("passport");
const flash = require("connect-flash");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var configDB = require("./config/database");
var db = require("./db/db");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");
        this.app.use("/javascript", express.static(path.resolve(__dirname, "../javascript")));
        this.app.use("/pages", express.static(path.resolve(__dirname, "../pages")));
        this.app.use("/node_modules", express.static(path.resolve(__dirname, "../node_modules")));
        this.app.use("/dist", express.static(path.resolve(__dirname, "../dist")));
        this.app.use("/js", express.static(path.resolve(__dirname, "../js")));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan("dev"));
        this.app.use(session({ secret: "roger" }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
    routes() {
        let router;
        router = express.Router();
        var index = new indexRoute.Index();
        router.get("/", function (req, res) {
            res.sendFile("index.html", { "root": "pages/" });
        });
        router.post("/signup", passport.authenticate("local-signup", {}));
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
