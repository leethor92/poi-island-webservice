'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const reviewSchema = new Schema({
  reviewName: String,
  reviewDetails: String,
  rating: String,
  point: {
      type: Schema.Types.ObjectId,
      ref: 'PointOfInterest'
    },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});

module.exports = Mongoose.model('Reviews', reviewSchema);