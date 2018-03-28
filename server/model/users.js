const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    username: String,
    password: String,
  },{
    timestamps: true
  });

module.exports = mongoose.model('user', userSchema);