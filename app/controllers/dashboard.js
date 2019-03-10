'use strict';

const PointOfInterest = require('../models/POI');
const User = require('../models/user');
const Joi = require('joi');

const Dashboard = {
  home: {
    handler: function(request, h) {
      return h.view('home', { title: 'Explore the Irish isles' });
    }
  },

  addPOI: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newPoint = new PointOfInterest({
          name: data.name,
          details: data.details,
          firstName: user.firstName,
          lastName: user.lastName
        });
        await newPoint.save();
        return h.redirect('/report');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  pointSettings: {
    handler: async function(request, h) {
      try {
        const point = await PointOfInterest.findById(request.params.id);
        return h.view('updatepoi', { title: 'Update POI', point: point});
      } catch (err) {
        return h.view('main', { errors:[{ message: err.message}]});
      }
    }
  },
  updatePoint: {
    validate: {
      payload: {
        name: Joi.string().required(),
        description: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, h, error) {
        return h.view('updatepoi', { title: 'poi update error', errors: error.details}).takeover().code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const pointUpdate = request.payload;
        const point = await PointOfInterest.findById(request.params.id);
        point.name = pointUpdate.name;
        point.details = pointUpdate.details;
        await point.save();
        return h.view('poi', { title: 'Explore the Irish isles', point: point });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message}]});
      }
    }
  },

  report: {
    handler: async function(request, h) {
      const pointsOfInterest = await PointOfInterest.find().populate('member');
      return h.view('report', {
        title: 'Places to see',
        points: pointsOfInterest
      });
    }
  },

  showSettings: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        return h.view('settings', { title: 'Donation Settings', user: user });
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },

  updateSettings: {
    handler: async function(request, h) {
     try{
      const userEdit = request.payload;
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      user.firstName = userEdit.firstName;
      user.lastName = userEdit.lastName;
      user.email = userEdit.email;
      user.password = userEdit.password;
      await user.save();
      return h.redirect('/settings');
    } catch(err) {
       return h.view('main', { errors: [{ message: err.message }] });
     }
    }
  }

};


module.exports = Dashboard;