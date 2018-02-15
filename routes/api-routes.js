 // Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var flash = require('express-flash');
// =========================================================================================================================================
// Forgot password token
// =========================================================================================================================================
            // route if user forgets password
        app.get('/forgot', function(req, res) {
            res.render('forgot', {
                user: req.user.email
            });

        });//close of get forget


        app.post('/forgot', function (req, res, next) {
          console.log('we hit the /fogot route !!!!');


          async.waterfall([
            function(done) {
              crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                console.log('WE JUST MADE THIS TOKEN!!!', token);
                done(err, token);
              });
            },
            function(token, done) {
              console.log('req.body.email', req.body);


              db.User.find({ where: { email: req.body.email } })
                .then(function(user) {
                  // Check if record exists in db
                  console.log('we found this user -------', user);
                  if (user) {
                    user.updateAttributes({
                      token: token
                    })
                    .then(function(weUpdatedThis) {
                      console.log('we updated this user!!!', weUpdatedThis);

                      let transporter = nodemailer.createTransport({
                          host: 'smtp.sendgrid.net',
                          port: 587,
                          secure: false, // true for 465, false for other ports
                          auth: {
                              user: 'Nebula1',
                              pass: 'Nebula123'
                          }
                      });

                      var mailOptions = {
                        to: 'laura.seanna@gmail.com',
                        from: 'nebula1@demo.com',
                        subject: 'Password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                      };//close of mailOptions(52)
               
                //       // send mail with defined transport object
                      transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              return console.log('error from nodemailer !!!!!!',error);
                          }
                          console.log('Message sent: %s', info.messageId);
                          // Preview only available when sending through an Ethereal account
                          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                          console.log('right before redirect!!!!');
                          res.redirect('/');
                          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                      });
                     
                    });
                  }
                });

                

            }
          ])
          
          
        });
// ==========================================================================================================================================
// Reset User Password
// ==========================================================================================================================================

        app.post('/reset', function(req, res) {
          console.log(req.body, req.params);
            async.waterfall([
              function(done) {

                db.User.find({ where: { token: req.body.token } })
                .then(function(user) {

                   console.log('we found this user!---------', user);
                  if (user) {
                     user.updateAttributes({
                        password: req.body.password,
                        token: null
                     })
                     .then(function(weUpdatedThisPassword){
                      res.redirect('/');
                      console.log('we updated this users password----', weUpdatedThisPassword);
                     })
                  }

                  user.save(function(err) {
                    req.logIn(user, function(err) {
                      
                      done(err, user);
            
                    });
                  });
                });
              },
             
            ], function(err) {
              res.redirect('/');
            });
          });
         

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
