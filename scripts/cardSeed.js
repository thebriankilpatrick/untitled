const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/card-game"
);

const cardSeed = [
    {
        title: "Dumbledore Retriever",
        power: 9,
        img: "/assets/images/dumbledoreRetriever.png",
        flavor: "Expecto Pawtronum!"
    },

    {
        title: "Teenage Mutant Ninja Cat",
        power: 5,
        img: "/assets/images/teenageMutantNinjaCat.png",
        flavor: ""
    },

    {
        title: "Omni-Cat",
        power: 10,
        img: "/assets/images/omniCat.png",
        flavor: "Galaxies. Lasers. Pizza."
    },

    {
        title: "Bombardier Kitty",
        power: 5,
        img: "/assets/images/bombardierKitty.png",
        flavor: "EXPLOSIONS!!!"
    },

    {
        title: "Bob",
        power: 2,
        img: "/assets/images/bob.png",
        flavor: "You have cat to be kitten me, right meow."
    },

    {
        title: "Thug Pug",
        power: 2,
        img: "/assets/images/thugPug.png",
        flavor: ""
    },

    {
        title: "Santa Paws",
        power: 4,
        img: "/assets/images/santaPaws.png",
        flavor: ""
    },

    {
        title: "Pug In A Rug",
        power: 4,
        img: "/assets/images/pugInARug.png",
        flavor: ""
    },

    {
        title: "Jacked Rabbit",
        power: 6,
        img: "/assets/images/jackedRabbit.png",
        flavor: "I like to lift things and then put them back down."
    },

    {
        title: "Crossfit Cat",
        power: 4,
        img: "/assets/images/crossfitCat.png",
        flavor: "Do you even cat, bro?"
    },

    {
        title: "Fluffy",
        power: 7,
        img: "/assets/images/fluffy.png",
        flavor: "So cute, ya just want to pet 'em."
    },

    {
        title: "Skittles, the Destroyer",
        power: 10,
        img: "/assets/images/skittlesTheDestroyer.png",
        flavor: "Skittles invokes destruction to all who gaze upon its cuteness."
    },

    {
        title: "Bravery Incarnate",
        power: 3,
        img: "/assets/images/braveryIncarnate.png",
        flavor: "Sure.  I suppose bravery comes in all shapes and sizes."
    },

    {
        title: "Jabba the Nutt",
        power: 3,
        img: "/assets/images/jabbaTheNutt.png",
        flavor: "I will not give up my favorite nut."
    },

    {
        title: "Cat in the Hat",
        power: 4,
        img: "/assets/images/catInTheHat.png",
        flavor: "I mustache you a question."
    },

    {
        title: "The Grey Wizard",
        power: 7,
        img: "/assets/images/theGreyWizard.png",
        flavor: "You shall not pass!"
    },

    {
        title: "Tuxedo Chicken",
        power: 4,
        img: "/assets/images/tuxedoChicken.png",
        flavor: "You are a chicken, right?"
    },

    {
        title: "Disco Chick",
        power: 3,
        img: "/assets/images/discoChick.png",
        flavor: ""
    },

    {
        title: "Snail Mail",
        power: 2,
        img: "/assets/images/snailMail.png",
        flavor: "Perhaps you should have overnighted that package?"
    },

    {
        title: "Count Flufferton",
        power: 6,
        img: "/assets/images/countFlufferton.png",
        flavor: ""
    }
];

db.Card
  .remove({})
  .then(() => db.Card.collection.insertMany(cardSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
});