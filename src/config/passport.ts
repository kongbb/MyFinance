import { Passport } from "passport";
import { Strategy } from "passport-local";
var user = require("../mongoModel/user");

var localStrategy = Strategy;

export class LocalPassport {
    private _passport: Passport;
    constructor(passport: Passport) {
        this._passport = passport;
        this.setStrategy();
    }

    serializeUser(user, done) {
        this._passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
    }

    deserializeUser(id, done) {
        this._passport.deserializeUser(function(id, done) {
            user.findById(id, function(err, user) {
                done(err, user);
            });
        });
    }

    private setStrategy() {
        this._passport.use("local-signup", new localStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : "email",
                passwordField : "password",
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) {

                // asynchronous
                // user.findOne wont fire unless data is sent back
                process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                user.findOne({ "local.email" :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash("signupMessage", "That email is already taken."));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser            = new user();

                        // set the user's local credentials
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
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