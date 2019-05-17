'use strict';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const assert = require('chai').assert;
const PointService = require('./point-service');
const _ = require('lodash');
const fixtures = require('./fixtures.json');

suite('Point API tests', function () {
  let points = fixtures.points;
  let newPoint = fixtures.newPoint;

  const pointService = new PointService('https://desktop-tmdjo97:3000');

  test('create a point', async function() {
    const returnedPoint = await pointService.createPoint(newPoint);
    assert(_.some([returnedPoint], newPoint), 'returnedPoint must be a superset of newPoint');
    assert.isDefined(returnedPoint._id);
  });


});