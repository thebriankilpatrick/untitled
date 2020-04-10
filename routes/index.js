const db = require("../models");
// // const path = require("path");
// const express = require("express");
// const app = express();
// const passport = require("passport");

module.exports = function(app) {

    app.get("/api/user", (req, res) => {
        console.log("Hitting the route GET /api/user")
        const userId = req.user._id;
        db.User.findOne({_id:userId}).then(dbUser => {
            console.log(dbUser)
            res.json(dbUser);
        }).catch(err => {
            console.log(err)
            res.json(err);
        });
    });

    app.post("/api/user", (req, res) => {
        console.log("Hitting the route POST /api/user")
        db.User.create(req.body).then(dbUser => {
            console.log(dbUser)
            res.json(dbUser);
        }).catch(err => {
            console.log(err)
            res.json(err);
        });
    });
}