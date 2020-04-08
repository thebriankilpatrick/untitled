const db = require("../models");
const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");

module.exports = function() {

    app.get("/api/user", (req, res) => {
        const userId = req.user._id;
        db.User.findOne({_id:userId}).then(dbUser => {
            res.json(dbUser);
        }).catch(err => {
            res.json(err);
        });
    });

    app.post("/api/user", (req, res) => {
        console.log("What do I put here...")
    })
}