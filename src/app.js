/// <reference path="../typings/index.d.ts" />
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
        //configure jade
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");
        //mount logger
        //this.app.use(logger("dev"));
        this.app.use("/javascript", express.static(path.resolve(__dirname, "../javascript")));
        this.app.use("/pages", express.static(path.resolve(__dirname, "../pages")));
        this.app.use("/node_modules", express.static(path.resolve(__dirname, "../node_modules")));
        this.app.use("/dist", express.static(path.resolve(__dirname, "../dist")));
        this.app.use("/js", express.static(path.resolve(__dirname, "../js")));
        this.app.use(cookieParser()); // read cookies (needed for auth)
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan("dev")); // log every request to the console
        this.app.use(session({ secret: "roger" })); // session secret
        this.app.use(passport.initialize());
        this.app.use(passport.session()); // persistent login sessions
        this.app.use(flash()); // use connect-flash for flash messages stored in session
        //add static paths
        // this.app.use(express.static(path.join(__dirname, "public")));
        // this.app.use(express.static(path.join(__dirname, "bower_components")));
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
    routes() {
        //get router
        let router;
        router = express.Router();
        //create routes
        var index = new indexRoute.Index();
        //home page
        router.get("/", function (req, res) {
            res.sendfile("pages/index.html");
        });
        //use router middleware
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
