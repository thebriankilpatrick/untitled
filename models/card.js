const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: {type: String, required: true},
    power: {type: Number, required: true},
    img: {type: String, required: true},
    flavor: {type: String}
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;