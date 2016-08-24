"use strict";
const passport_local_1 = require("passport-local");
var user = require("../mongoModel/user");
var localStrategy = passport_local_1.Strategy;
class LocalPassport {
    constructor(passport) {
        this._passport = passport;
        this.setStrategy();
    }
    serializeUser(user, done) {
        this._passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
    }
    deserializeUser(id, done) {
        this._passport.deserializeUser(function (id, done) {
            user.findById(id, function (err, user) {
                done(err, user);
            });
        });
    }
    setStrategy() {
        this._passport.use("local-signup", new localStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        }, function (req, email, password, done) {
            process.nextTick(function () {
                user.findOne({ "local.email": email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, req.flash("signupMessage", "That email is already taken."));
                    }
                    else {
                        var newUser = new user();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
    }
}
exports.LocalPassport = LocalPassport;
