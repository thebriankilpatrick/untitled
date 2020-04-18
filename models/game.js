const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Should I include winner and loser?
// This would be to handle who gets the bonus of winning v. losing...?
const gameSchema = new Schema({
    playerOne: {
        type: String,
        required: true
    },
    playerTwo: {
        type: String
    },
    playerOneAccepted: {
        type: Boolean,
        default: false
    },
    playerTwoAccepted: {
        type: Boolean,
        default: false
    },
    gameStatus: ""
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;