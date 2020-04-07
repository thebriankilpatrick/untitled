const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    playerOne: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    playerTwo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;