 // Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error


  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authorized
    res.json("/members");
  });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error


  // Route for signup
// ==========================================================

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });


  // Route for logging user out
// ==========================================================

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });




  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
      console.log( res.json({}));
    }
    else {
      // Otherwise send back the user's username and id
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });



  //// Routes for emotions,
// ==========================================================


  app.get("/api/emotions", function(req, res) {
  db.Emotion.findAll({
    where: {
    UserId: req.query.user_id
    }})
    .then(function(data){
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
  });



  app.post("/api/emotions", function(req, res) {
  db.Emotion.create({
    Emotion: req.body.emotion,
    Color: req.body.color,
    Emotion_Date: req.body.emotion_date,
    UserId: req.body.user_id,
    Positive_Emotion: req.body.positive_emotion
  }).then(function(data) {
      res.json(data);
    });
  });




  //// Routes for missions,
// ==========================================================



  app.get("/api/missions", function(req, res) {
  db.Mission.findAll({
    where: {
    UserId: req.query.user_id
    }})
    .then(function(data){
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
  });



  app.post("/api/missions", function(req, res) {
  db.Mission.create({
    Mission_id: req.body.mission_id,
    Mission_Result: req.body.mission_result,
    Mission_Date: req.body.mission_date,
    UserId: req.body.user_id
  }).then(function(data) {
      res.json(data);
    });
  });



  //// Routes for memo,
// ==========================================================



  app.get("/api/memos", function(req, res) {
  db.Memo.findAll({
    where: {
    UserId: req.query.user_id
    }})
    .then(function(data){
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
  });



  app.post("/api/memos", function(req, res) {
  db.Memo.create({
    Memo_Text: req.body.memo_text,
    Memo_Date: req.body.memo_date,
    UserId: req.body.user_id
  }).then(function(data) {
      res.json(data);
    });
  });


// ==========================================================
// OLD ROUTES
// ==========================================================

  // app.post("/api/dailymoods", function(req, res) {
  // db.Mood.create({
  //   mood_id: req.body.mood_id,
  //   color: req.body.color,
  //   mood_date: req.body.mood_date,
  //   DimMoodId: req.body.DimMoodId,
  //   UserId: req.body.user_id
  // }).then(function(data) {
  //       res.json(data);
  //     });
  // });


  // app.get("/api/dailymoods", function(req, res) {
  // db.Mood.findAll({
  //   where: {
  //   UserId: req.query.user_id
  // },
  // include: [db.Dim_moods]
  // }).then(function(data){
  //       res.json(data);
  //     }).catch(function(err) {
  //     console.log(err);
  //     res.json(err);
  //   });
  // });


  // app.get("/api/alldailymoods", function(req, res) {
  // db.Mood.findAll({}).
  // then(function(data){
  //       res.json(data);
  //     }).catch(function(err) {
  //     res.json(err);
  //   });
  // });




  //   app.get("/api/mood_data", function(req, res){
  //     db.Dim_moods.findAll({
  //       where: {
  //         active : 1
  //       }
  //     }).then(function(data){
  //       res.json(data);
  //     }).catch(function(err) {
  //     console.log(err);
  //     res.json(err);
  //   });
  // });




}; // *** END ***
