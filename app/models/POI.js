'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  details: String,
  member: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: String
});

module.exports = Mongoose.model('PointOfInterest', poiSchema);