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
    })

    // ---------------------------------------------------------------------------------------
    // TESTING FIND MATCH FUNCTIONALITY
    app.post("/api/findGame", (req,res) => {
        console.log("DOES IT EVENT GET TO HERE??");
        db.Game.findOne({
            gameStatus: "waiting"
        }).then(dbGame => {
            console.log("dbGame object received back from the find request", dbGame);
            if (!dbGame) {

                db.Game.create({
                    playerOne: req.body.player,
                    gameStatus: "waiting"
                }).then(gameObj => {
                    console.log("Game did NOT exist, created one here ----", gameObj);

                    // return back to UI {gameId: 12344, gameStatus: "ready" or "waiting"}
                    res.json(gameObj);
                })
            }
            else {
                console.log("Game exists, here it is --------", dbGame);
                console.log("HEY YOU!  THIS IS THE REQ.BODY-------", req.body);
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



    // Perhaps how the game route should be done?? -------------------
    // app.get("/api/findGame", (req,res) => {
    //     db.Game.findOne({
    //         playerOne: { $ne: null },
    //         playerTwo: null
    //     }).then(dbGame => {
    //         console.log("GET REQUEST FOR FIND GAME--", dbGame);
    //         res.json(dbGame);
    //     }).catch(err => {
    //         console.log("Something went wrong, Get request for find game", err);
    //         res.status(500).send(err);
    //     });
    // });

    // app.post("/api/findGame", (req, res) => {
    //     db.Game.create(req.body
    //     ).then(dbGame => {
    //         console.log("CREATED A NEW GAME RECORD---", dbGame);
    //         res.json(dbGame);
    //     }).catch(err => {
    //         console.log("Something went wrong, post request for find game", err);
    //         res.status(500).send(err);
    //     })
    // });

    // app.put("/api/findGame", (req, res) => {
    //     db.Game.findOneAndUpdate({
    //         gameStatus: "waiting"
    //     },
    //     req.body
            
    //     ).then(dbGame => {
    //         console.log("UPDATE REQUEST FOR FIND GAME---", dbGame);
    //         res.json(dbGame);
    //     }).catch(err => {
    //         console.log("Something went wrong, PUT request for find game", err);
    //         res.status(500).send(err);
    //     })
    // })




    // -------------------- TESTING TO FIND DB CARDS -----------------
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