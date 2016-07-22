/// <reference path="_all.d.ts" />
"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as indexRoute from "./routes/index";

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

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(express.static(path.join(__dirname, "bower_components")));

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

    //create routes
    var index: indexRoute.Index = new indexRoute.Index();

    //home page
    router.get("/", index.index.bind(index.index));

    //use router middleware
    this.app.use(router);
  }
}

var server = Server.bootstrap();
export = server.app;