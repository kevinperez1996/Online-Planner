// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the calendar page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the calendar page
    if (req.user) {
      res.redirect("/calendar");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the calendar page
    if (req.user) {
      res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });



  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/calendar", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/calendar.html"));
  });

};
