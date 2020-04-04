const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs"); // Need install
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    birthday: {type: Date, required: true}, // ??
    password: {type: String, required: true}
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