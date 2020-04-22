const db = require("../models");
// // const path = require("path");
// const express = require("express");
// const app = express();
const passport = require("passport");

module.exports = function(app, passport) {

    // app.get("/api/user/:email", (req, res) => {
    //     console.log("Hitting the route GET /api/user")
    //     const userEmail = req.params.email;
    //     console.log(req);
    //     db.User.findOne({email: userEmail}).then(dbUser => {
    //         console.log(dbUser)
    //         res.json(dbUser);
    //     }).catch(err => {
    //         console.log(err)
    //         res.json(err);
    //     });
    // });

    function isLoggedIn(req, res, next){
        //if user is authenticated in the session carry on
        if(req.isAuthenticated())
            return next();
        //if they aren't redirect them to the home page
        res.json(req.user);
    }

    app.get("/home", isLoggedIn, function(req, res){
        // Add const userObj, to modify what I am sending back to the front end
        console.log("------------------- HOME ROUTE");
        res.json(req.user);
    })

    app.get("/login", function(req, res){
        // Add const userObj, to modify what I am sending back to the front end
        console.log("------------------- LOGIN FAILURE ROUTE");
        res.status(500).json(req.user);
    })

    // -----------IN CASE OF ERROR, SEND INFO BACK TO USER THAT USERNAME IS TAKEN
    app.post("/api/user", (req, res) => {
        console.log("Hitting the route POST /api/user")
        db.User.create(req.body).then(dbUser => {
            console.log(dbUser)
            res.json(dbUser);
        }).catch(err => {
            console.log(err);
            res.status(409).send("User already exists.");
        });
    });

    app.get("/api/user", (req, res) => {
        db.User.find().then(dbUsers => {
            console.log(dbUsers);
            res.json(dbUsers);
        }).catch(err => {
            res.status(500).send(err);
        })
    });

    app.get("/api/findUser", (req, res) => {
        console.log("HERE IS THE REQ YOU ARE PASSING TO ENDPOINT", req.user._id);
        db.User.findById({
            _id: req.user._id
        }
        ).then(dbUser => {
            console.log("FIND USER END POINT", dbUser);
            res.json(dbUser);
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    // --------------------------------- TESTING UPDATE USER END POINT --------
    app.put("/api/user/win", (req, res) => {
        console.log("HERE IS THE WIN DB ENDPOINT, AND THE REQ IS:", req.body);
        db.User.findByIdAndUpdate({
            _id: req.body._id
        },{
            $inc: {rank: 5, wins: 1}
        }, {
            new: true
        }).then(dbUser => {
            console.log("WIN DB ENDPOINT", dbUser);
            res.json(dbUser);
        }).catch(err => {
            res.status(500).send(err);
        })
    });

    // Need to handle to make sure honor does not go below 0

    // Gets the user, and reads the honor
    // if else statement to decide the decrement of the honor
    app.put("/api/user/lose", (req,res) => {
        db.User.findById({
            _id: req.body._id
        }).then(dbUser => {
            if (dbUser.rank > 2) {
                db.User.findByIdAndUpdate({
                    _id: req.body._id
                },{
                    $inc: {rank: -2, losses: 1} 
                }, {
                    new: true
                }).then(dbUser => {
                    console.log("LOSE DB ENDPOINT", dbUser);
                    res.json(dbUser);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
            else if (dbUser.rank === 1) {
                db.User.findByIdAndUpdate({
                    _id: req.body._id
                },{
                    $inc: {rank: -1, losses: 1} 
                }, {
                    new: true
                }).then(dbUser => {
                    console.log("LOSE DB ENDPOINT", dbUser);
                    res.json(dbUser);
                }).catch(err => {
                    res.status(500).send(err);
                })
            }
            else if (dbUser.rank === 0) {
                db.User.findByIdAndUpdate({
                    _id: req.body._id
                },{
                    $inc: {losses: 1} 
                }, {
                    new: true
                }).then(dbUser => {
                    console.log("LOSE DB ENDPOINT", dbUser);
                    res.json(dbUser);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        });
        
        // db.User.findByIdAndUpdate({
        //     _id: req.body.id
        // },{
        //     $inc: {honor: -2, losses: 1} 
        // }, {
        //     new: true
        // }).then(dbUser => {
        //     console.log("LOSE DB ENDPOINT", dbUser);
        // }).catch(err => {
        //     res.status(500).send(err);
        // })
    })


    app.post("/api/findGame", (req,res) => {
        db.Game.findOne({
            gameStatus: "waiting"
        }).then(dbGame => {
            // console.log("dbGame object received back from the find request", dbGame);
            if (!dbGame) {

                db.Game.create({
                    playerOne: req.body.player,
                    gameStatus: "waiting"
                }).then(gameObj => {
                    // console.log("Game did NOT exist, created one here ----", gameObj);
                    res.json(gameObj);
                })
            }
            else {
                // console.log("Game exists, here it is --------", dbGame);
                // res.json(dbGame);
                db.Game.findByIdAndUpdate({
                    _id: dbGame._id
                },{
                    playerTwo: req.body.player,
                    gameStatus: "ready"
                },
                {
                    // Forces the call to return an updated record
                    new: true
                }
                ).then(gameObj => {
                    console.log("Updated existing game record", gameObj);
                    res.json(gameObj);
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).send(err);
        })
    });


    // Getting Card data from the db
    app.get("/api/cards", (req, res) => {
        db.Card.find().then(cardData => {
            // console.log(cardData);
            res.json(cardData);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    });

    app.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: false })
    );
}