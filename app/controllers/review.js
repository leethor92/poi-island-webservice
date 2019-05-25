'use strict';

const Review = require('../models/review');

const User = require('../models/user');

const PointOfInterest = require('../models/POI');

const Reviews = {
  review: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const rawPoint = request.payload.point.split(',');
        const point = await PointOfInterest.findOne({name: rawPoint});

        const newReview = new Review({
          reviewName: data.reviewName,
          reviewDetails: data.reviewDetails,
          rating: data.rating,
          point: point._id,
          member: user._id
        });
        await newReview.save();
        console.log(newReview);
        return h.redirect('/reviewreport');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  reviewlist: {
    handler: async function(request, h) {
      const reviews = await Review.find().populate('point').populate('member');
      const pointsOfInterest = await PointOfInterest.find().populate('member');

      return h.view('reviewreport', {
        title: 'List of Island Reviews',
        reviews: reviews,
        points: pointsOfInterest
      });
    }
  },

};

module.exports = Reviews;