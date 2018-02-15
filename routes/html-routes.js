// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

    app.get("/members", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members/members.html"));
  });
    app.get("/memos", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/memos/memos.html"));
  });
    app.get("/missions", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/missions/missions.html"));
  });
  //   app.get("/about", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/about/about.html"));
  // });
  //   app.get("/moodmap", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/moodmap/moodmap.html"));
  // });
  //   app.get("/meditate", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/meditate/meditate.html"));
  // });


    app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  
  app.get("/forgot", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/reset");
    }
    res.sendFile(path.join(__dirname, "../public/forgot.html"));
  });

   app.get("/forgotMessage", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/reset");
    }
    res.sendFile(path.join(__dirname, "../public/forgotMessage.html"));
  });

  app.get("/reset/:token", function(req, res) {
    console.log('new route---------------')
    if (req.user) {
      res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/reset.html"));
  });





};
