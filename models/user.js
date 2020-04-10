const mongoose = require("mongoose");
// const bcrypt = require("bcrypt-nodejs"); // Need install
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, trim: true},
    username: {type: String, required: true, minlength: 2, trim: true},
    birthday: {type: Date, required: true}, // ??
    password: {type: String, required: true, trim: true},
    friend:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    cards: [{
        type: Schema.Types.ObjectId,
        ref: "Card"
    }],
    rank: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    wins: {type: Number, default: 0},
    deck: {
        cards: [],
        totalCount: {type: Number},
        totalPower: {type: Number}
    },
    game: [{
        type: Schema.Types.ObjectId,
        ref: "Game"
    }]
});

//generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//checking if password is valid
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;