// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the calendar page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.status(401).json({
          message: "Something went wrong"
        });
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });


  app.get("/api/plans/", function (req, res){

    db.Plan.findAll({}).then(function (data){
      console.log(data);
      res.json(data);
    });
  });


  app.post("/api/planner", function (req, res){
    console.log(req.body);
    db.Plan.create({
      title: req.body.title,
      type: req.body.type,
      time: req.body.time,
      description: req.body.description,
      eventDate: req.body.eventDate
    }).then(function (data){
      res.json(data);
    })
  })
  
  app.delete("/api/plans/:id", function(req, res) {
    db.Plan.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/plans", function(req, res) {
    console.log(req.body);
    db.Plan.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(data) {
        res.json(data);
      });
  });
};