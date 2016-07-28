/// <reference path="../_all.d.ts" />
import DbConfig from "../config/database";
// Bring Mongoose into the app
import mongoose = require("mongoose");
// alternative way
//var mongoose = require("mongoose");
//let mongoose = require("mongoose");


// Build the connection string
var dbURI = DbConfig.URL;
//var dbURI = "mongodb://localhost:27017/test";

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open to " + dbURI);
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function() {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});


// BRING IN YOUR SCHEMAS & MODELS
// For example
// require("./team");