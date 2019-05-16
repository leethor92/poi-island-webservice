'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const bcrypt = require('bcrypt');
const Boom = require('boom')

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email : email});
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  if (!isMatch) {
    throw new Boom('Password mismatch');
  }
  return this;
};

module.exports = Mongoose.model('User', userSchema);