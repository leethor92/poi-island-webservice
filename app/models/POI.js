'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  details: String,
  category: String,
  member: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  long: Number,
  lat: Number,

});

module.exports = Mongoose.model('PointOfInterest', poiSchema);