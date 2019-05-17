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

  setup(async function () {
    await pointService.deleteAllPoints();
  });

  teardown(async function () {
    await pointService.deleteAllPoints();
  });

  test('create a point', async function() {
    const returnedPoint = await pointService.createPoint(newPoint);
    assert(_.some([returnedPoint], newPoint), 'returnedPoint must be a superset of newPoint');
    assert.isDefined(returnedPoint._id);
  });

  test('get a point', async function() {
    const p1 = await pointService.createPoint(newPoint);
    const p2 = await pointService.getPoint(p1._id);
    assert.deepEqual(p1, p2);
  });

  test ('get invalid point', async function() {
    const p1 = await pointService.getPoint('1234');
    assert.isNull(p1);
    const p2 = await pointService.getPoint('012345678901234567890123');
    assert.isNull(p2);
  });

  test('delete a point', async function() {
    let p = await pointService.createPoint(newPoint);
    assert(p._id != null);
    await pointService.deleteOnePoint(p._id);
    p = await pointService.getPoint(p._id);
    assert(p == null);
  });

  test('get all points', async function () {
    for(let p of points) {
      await pointService.createPoint(p);
    }

    const allPoints = await pointService.getPoints();
    assert.equal(allPoints.length, points.length);
  });

  test('get points detail', async function () {
    for (let p of points) {
      await pointService.createPoint(p);
    }

    const allPoints = await pointService.getPoints();
    for (let i = 0; i < points.length; i++) {
      assert(_.some([allPoints[i]], points[i]), 'returnedPoint must be a superset of newCandidate');
    }
  });

  test('get all points empty', async function () {
    const allPoints = await pointService.getPoints();
    assert.equal(allPoints.length, 0);
  });

});