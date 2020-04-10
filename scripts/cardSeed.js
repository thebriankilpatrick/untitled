const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/card-game"
);

const cardSeed = [
    {
        title: "Dumbledore Retreiver",
        power: 9,
        img: "",
        flavor: "Expecto Pawtronum!"
    },

    {
        title: "Teenage Mutant Ninja Cat",
        power: 6,
        img: "",
        flavor: ""
    },

    {
        title: "Omni-Cat",
        power: 10,
        img: "",
        flavor: "Galaxies. Lasers. Pizza."
    },

    {
        title: "Bombardier Kitty",
        power: 6,
        img: "",
        flavor: "EXPLOSIONS!!!"
    },

    {
        title: "Bob",
        power: 2,
        img: "",
        flavor: "You have cat to be kitten me, right meow."
    },

    {
        title: "Thug Pug",
        power: 2,
        img: "",
        flavor: ""
    },

    {
        title: "Santa Paws",
        power: 4,
        img: "",
        flavor: ""
    },

    {
        title: "Pug In A Rug",
        power: 4,
        img: "",
        flavor: ""
    },

    {
        title: "Jacked Rabbit",
        power: 8,
        img: "",
        flavor: "I like to lift things and then put them back down."
    },

    {
        title: "Crossfit Cat",
        power: 5,
        img: "",
        flavor: "Do you even cat, bro?"
    },

    {
        title: "Fluffy",
        power: 7,
        img: "",
        flavor: "So cute, ya just want to pet 'em."
    },

    {
        title: "Skittles, the Destroyer",
        power: 10,
        img: "",
        flavor: "Skittles invokes destruction to all who gaze upon its cuteness."
    },

    {
        title: "Bravery Incarnate",
        power: 3,
        img: "",
        flavor: "Sure.  I suppose bravery comes in all shapes and sizes."
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