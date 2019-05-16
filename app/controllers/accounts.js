'use strict';

const User = require('../models/user');
const Joi = require('joi');
const Admin = require('../models/admin');
const Boom = require('boom');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const Accounts = {
  index: {
    auth: 'github-oauth',
    handler: function(request, h) {
      return h.view('main', { title: 'Welcome to the Irish Isles' });
    }
  },

  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view('signup', { title: 'Sign up for a POI account' });
    }
  },

  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view('signup', {
            title: 'Sign up error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },

    handler: async function(request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = 'Email address is already registered';
          throw new Boom(message);
        }

        const hash = await bcrypt.hash(payload.password, saltRounds);

        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: hash
        });
        user = await newUser.save();
        request.cookieAuth.set({ id: user.id });
        return h.redirect('/home');
      } catch (err) {
        return h.view('signup', { errors: [{ message: err.message }] });
      }
    }
  },

  showLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view('login', { title: 'Login to POI account' });
    }
  },

  login: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view('login', {
            title: 'Sign in error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        let admin = await Admin.findByEmail(email);
        if (user) {
          user.comparePassword(password);
          request.cookieAuth.set({ id: user.id });
          return h.redirect('/home');
        }
        else if (admin) {
          admin.comparePassword(password);
          request.cookieAuth.set({ id: admin.id });
          return h.redirect('/adminhome');
        }
        else {
          const message = 'Email address is not registered';
          throw new Boom(message);
        }
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },

  logout: {
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect('/');
    }
  },
  showSettings: {
    handler: async function(request, h) {
    try{
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      return h.view('settings', { title: 'Account Settings', user: user });
    } catch (err) {
      return h.view('login', { errors: [{message: err.message }]});
    }
   }
  },

  updateSettings: {
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view('settings', {
            title: 'Sign up error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const userEdit = request.payload;
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        user.firstName = userEdit.firstName;
        user.lastName = userEdit.lastName;
        user.email = userEdit.email;
        const hash = await bcrypt.hash(userEdit.password, saltRounds);
        user.password = hash;
        await user.save();
        return h.redirect('/settings');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

};

module.exports = Accounts;