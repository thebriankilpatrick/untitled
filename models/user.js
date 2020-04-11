const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, trim: true, unique: true},
    username: {type: String, required: true, minlength: 2, trim: true, unique: true},
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

userSchema.plugin(uniqueValidator);

// //generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// //checking if password is valid
// userSchema.methods.validPassword = function(password){
//     return bcrypt.compareSync(password, this.local.password);
// };

userSchema.methods = {
    checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
    hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
    }
}

userSchema.pre('save', function (next) {
    if (!this.password) {
      console.log('models/user.js =======NO PASSWORD PROVIDED=======')
      next()
    } else {
      console.log('models/user.js hashPassword in pre save');
      this.password = this.hashPassword(this.password)
      next()
    }
})

// userSchema.methods = {
//     checkPassword: function (inputPassword) {
//     return bcrypt.compareSync(inputPassword, this.password)
//   },
//     hashPassword: plainTextPassword => {
//     return bcrypt.hashSync(plainTextPassword, 10)
//     }
// }

const User = mongoose.model("User", userSchema);

module.exports = User;