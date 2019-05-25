const PointsApi = require('./app/api/points');
const UsersApi = require('./app/api/users');
const Reviews = require('./app/api/reviews');

module.exports = [
  { method: 'GET', path: '/api/points', config: PointsApi.find },
  { method: 'GET', path: '/api/points/{id}', config: PointsApi.findOne },
  { method: 'POST', path: '/api/points', config: PointsApi.create },
  { method: 'DELETE', path: '/api/points/{id}', config: PointsApi.deleteOne },
  { method: 'DELETE', path: '/api/points', config: PointsApi.deleteAll },


  { method: 'GET', path: '/api/users', config: UsersApi.find },
  { method: 'GET', path: '/api/users/{id}', config: UsersApi.findOne },
  { method: 'POST', path: '/api/users', config: UsersApi.create },
  { method: 'DELETE', path: '/api/users/{id}', config: UsersApi.deleteOne },
  { method: 'DELETE', path: '/api/users', config: UsersApi.deleteAll },
  { method: 'POST', path: '/api/users/authenticate', config: UsersApi.authenticate },

  { method: 'GET', path: '/api/reviews', config: Reviews.findAll },
  { method: 'GET', path: '/api/points/{id}/reviews', config: Reviews.findByPoint },
  { method: 'POST', path: '/api/points/{id}/reviews', config: Reviews.makeReview },
  { method: 'DELETE', path: '/api/reviews', config: Reviews.deleteAll }
];
