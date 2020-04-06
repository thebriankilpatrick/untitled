const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/card-game"
);

const cardSeed = [
    {
        title: "Dumbledore Retreiver",
        power: "",
        img: "",
        flavor: "Expecto Pawtronum!"
    },

    {
        title: "Teenage Mutant Ninja Cat",
        power: "",
        img: "",
        flavor: ""
    },

    {
        title: "Omni-Cat",
        power: "",
        img: "",
        flavor: "Galaxies. Lasers. Pizza."
    },

    {
        title: "Bombardier Kitty",
        power: "",
        img: "",
        flavor: "EXPLOSIONS!!!"
    },

    {
        title: "Bob",
        power: "",
        img: "",
        flavor: "You have cat to be kitten me, right meow."
    },

    {
        title: "Thug Pug",
        power: "",
        img: "",
        flavor: ""
    },

    {
        title: "Santa Paws",
        power: "",
        img: "",
        flavor: ""
    },

    {
        title: "Pug In A Rug",
        power: "",
        img: "",
        flavor: ""
    },

    {
        title: "Jacked Rabbit",
        power: "",
        img: "",
        flavor: ""
    },

    {
        title: "Crossfit Cat",
        power: "",
        img: "",
        flavor: "Do you even cat, bro?"
    },

    {
        title: "Fluffy",
        power: "",
        img: "",
        flavor: "So cute, ya just want to pet 'em"
    },

    {
        title: "",
        power: "",
        img: "",
        flavor: ""
    },

    {
        title: "",
        power: "",
        img: "",
        flavor: ""
    },

    {
        title: "",
        power: "",
        img: "",
        flavor: ""
    },

    {
        title: "",
        power: "",
        img: "",
        flavor: ""
    }
]