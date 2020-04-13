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
        res.json(req.user);
    })

    app.post("/api/user", (req, res) => {
        console.log("Hitting the route POST /api/user")
        db.User.create(req.body).then(dbUser => {
            console.log(dbUser)
            res.json(dbUser);
        }).catch(err => {
            console.log(err)
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