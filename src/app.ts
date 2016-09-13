"use strict";
import bodyParser = require("body-parser");
import { Request, Response, } from "express";
import { StockRouter } from "./routes/stock.api";

import * as express from "express";
import * as path from "path";
import * as indexRoute from "./routes/index.route";
import * as mongoose from "mongoose";
import * as passport from "passport";

import flash    = require("connect-flash");
var morgan       = require("morgan");
var cookieParser = require("cookie-parser");
var session      = require("express-session");
var configDB = require("./config/database");
var db = require("./db/db");

class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();

    this.config();

    this.routes();
  }

  private config() {
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
    this.app.use("/src", express.static(path.resolve(__dirname, "../src")));

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
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      var error = new Error("Not Found");
      err.status = 404;
      next(err);
    });
  }

  private routes() {
    //get router
    let router: express.Router;
    router = express.Router();

    //home page
    router.get("/", function(req: express.Request, res: express.Response){
      res.sendFile("index.html", {"root": "pages/"});
    });

    router.post("/signup", passport.authenticate("local-signup", {

    }));

    var stockRouter = new StockRouter().getRouter();
    //use router middleware
    this.app.use(router);
    this.app.use("/api/stocks", stockRouter);
  }

  requireAuthentication(req, res){
    res.json({user: "Roger"});
  }
}

var server = Server.bootstrap();
export = server.app;