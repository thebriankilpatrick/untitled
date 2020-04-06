const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs"); // Need install
const Schema = mongoose.Schema;

// Need to have association with:
// Other users, cards, "in-battle table"?

const userSchema = new Schema({
    email: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true},
    birthday: {type: Date, required: true}, // ??
    password: {type: String, required: true, trim: true}
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