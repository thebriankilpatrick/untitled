const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Should I include winner and loser?
// This would be to handle who gets the bonus of winning v. losing...?
const gameSchema = new Schema({
    playerOne: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    playerTwo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    playerOneAccepted: {
        type: Boolean,
        default: false
    },
    playerTwoAccepted: {
        type: Boolean,
        default: false
    }
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;