'use strict';

const Point = require('../models/POI');
const Boom = require('boom');

const Points = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const points = await Point.find();
      return points;
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
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      const newPoint = new Point(request.payload);
      const point = await newPoint.save();
      if(point) {
        return h.response(point).code(201);
      }
      return Boom.badImplementation('error creating point');
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Point.deleteMany({});
      return { success: true};
    }
  },

  deleteOne:{
    auth: false,
    handler: async function(request, h) {
      const point = await Point.deleteOne({_id: request.params.id});
      if(point) {
        return { success:true };
      }
      return Boom.notFound('id not found');
    }
  }

};

module.exports = Points;