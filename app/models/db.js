'use strict';

require('dotenv').config();

const Mongoose = require('mongoose');

Mongoose.connect(process.env.db);
const db = Mongoose.connection;

async function seed() {
  var seeder = require('mais-mongoose-seeder')(Mongoose);
  const data = require('./initdata');
  const PointOfInterest = require('./POI');
  const User = require('./user');
  const dbData = await seeder.seed(data, { dropDatabase: false, dropCollections: true});
  const points = await PointOfInterest.find();
  console.log(dbData);
}

db.on('error', function(err) {
  console.log(`database connection error: ${err}`);
});

db.on('disconnected', function() {
  console.log('database disconnected');
});

db.once('open', function() {
  console.log(`database connected to ${this.name} on ${this.host}`);
  seed();
})