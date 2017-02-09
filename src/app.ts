"use strict";
import bodyParser = require("body-parser");
import { Request, Response, Application } from "express";
import { IndexRoute } from "./route/index.route";
import { StockRouter } from "./route/stock.route";
import { CompanyRouter } from "./route/company.route";
var BearerStrategy = require("passport-http-bearer").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
import * as express from "express";
import * as path from "path";
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
    this.app.use(passport.session());
    this.app.use(flash()); // use connect-flash for flash messages stored in session
    //add static paths
    // this.app.use(express.static(path.join(__dirname, "public")));
    // this.app.use(express.static(path.join(__dirname, "bower_components")));

    // this.app.use(function redirectRouterUnmatched(req,res) {
    //   res.sendFile("index.html", { root: 'pages/' });
    // });
    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: Request, res: express.Response, next: express.NextFunction) {
      var error = new Error("Not Found");
      err.status = 404;
      next(err);
    });
  }

  private routes() {
    //this.test(passport);
    //this.testGoogle(passport);
    new IndexRoute().config(this.app, passport);
    var stockRouter = new StockRouter().getRouter();
    this.app.use("/api/stocks", stockRouter);

    var companyRoute = new CompanyRouter().getRouter();
    this.app.use("/api/company", companyRoute);

  }

  private test(passport){
    passport.use(new BearerStrategy(function(token, done){
      var s = "123";
      return done(null, {test: "123"});
    }));
  }

  private testGoogle(passport){
    passport.use(new GoogleStrategy({
        clientID: "1005942748616-gn1b79gm1dvv800q3pjtk7e0rh8n1loi.apps.googleusercontent.com",
        clientSecret: "2tk5fTAZcM6cuJ4kneq3QUF6",
        callbackURL: ""
      }, function(accessToken, refreshToken, profile, done){
        var token = accessToken;
        process.nextTick(function(){
          return done(null, profile);
        });
    }));
  }
}

export = new Server().app;