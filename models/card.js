const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: {type: String},
    power: {type: Number},
    img: {type: String},
    flavor: {type: String}
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;