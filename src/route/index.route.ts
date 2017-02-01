import { Request, Response, Application } from "express";
import { Passport } from "passport";


export class IndexRoute{
  
  serialize(req: Request, res: Response, next){
    var user = req.user;
    req.user = {
      id: "roger-test-id"
    };
    next();
  }
  
  generateToken(req: Request, res: Response, next){
    //req.token = ""
    next();
  }

  config(app: Application, passport: Passport){
    app.get("/", function(req: Request, res: Response){
      res.sendFile("index.html", {"root": "pages/"});
    });

    app.get("/ping", passport.authenticate("bearer", { session: false }), this.serialize, this.generateToken, function(req: Request, res: Response){
      res.status(200).json({hello: "world"});
    });

    app.get("/google", passport.authenticate("google", { session: false }), function(req: Request, res: Response){
      res.status(200).json({google: "success"});
    });

    // app.get("/login", function(req: Request, res: Response){
    //   res.sendFile("login.html", {"root": "pages/"});
    // });

    // app.get("/signup", function(req: Request, res: Response){
    //   res.sendFile("signup.html", {"root": "pages/"});
    // });

    // app.get("/finance", function(req: Request, res: Response){
    //   res.sendFile("finance.html", {"root": "pages/"});
    // });

    // app.post('/login', passport.authenticate('local-login', {
    //   successRedirect : '/finance', // redirect to the secure profile section
    //   failureRedirect : '/login', // redirect back to the signup page if there is an error
    //   failureFlash : true // allow flash messages
    // }));

    // // process the signup form
    // app.post('/signup', passport.authenticate('local-signup', {
    //   successRedirect : '/finance', // redirect to the secure profile section
    //   failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //   failureFlash : true // allow flash messages
    // }));

    // // =====================================
    // // LOGOUT ==============================
    // // =====================================
    // app.get('/logout', function(req, res) {
    //   req.logout();
    //   res.redirect('/');
    // });
  }
}

// route middleware to make sure
// function isLoggedIn(req, res, next) {

// 	// if user is authenticated in the session, carry on
// 	if (req.isAuthenticated())
// 		return next();

// 	// if they aren't redirect them to the home page
// 	res.redirect('/');
// }
