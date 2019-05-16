'use strict';

const Point = require('../models/POI');
const Boom = require('boom');

const Points = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const Points = await Point.find();
      return Points;
    }
  },
  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
      const point = await Point.findOne({_id: request.params.id});
      if(!point) {
      return Boom.notFound('No point with this ID');
      }
      return point;
      } catch (err) {
        return Boom.notFound('No point with this ID');
      }
    }
  }
};

module.exports = Points;