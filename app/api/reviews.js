'use strict';

const Boom = require('boom');
const Review = require('../models/review');
const Point = require('../models/POI')

const Reviews = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const reviews = await Review.find();
      return reviews;
    }
  },

  findByPoint: {
    auth: false,
    handler: async function(request, h) {
      const reviews = await Review.find({ point: request.params.id });
      return reviews;
    }
  },

  makeReview: {
    auth: false,
    handler: async function(request, h) {
      let review = new Review(request.payload);
      const point = await Point.findOne({ _id: request.params.id });
      if (!point) {
        return Boom.notFound('No Point with this id');
      }
      review.point = point._id;
      review = await review.save();
      return review;
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Review.deleteMany({});
      return { success: true };
    }
  }

};

module.exports = Reviews;