'use strict';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const assert = require('chai').assert;
const axios = require('axios');

suite('Point API tests', function () {

  test('get points',async function () {
    const response = await axios.get('https://desktop-tmdjo97:3000/api/points');
    const points = response.data;
    assert.equal(3, points.length);

    assert.equal(points[0].name, 'Tory Island');
    assert.equal(points[1].name, 'Inishmaan');
    assert.equal(points[2].name, 'Inisheer');
  });

  test('get one point', async function () {
    let response = await axios.get('https://desktop-tmdjo97:3000/api/points');
    const points = response.data;
    assert.equal(3, points.length);

    const onePointUrl = 'https://desktop-tmdjo97:3000/api/points/' + points[0]._id;
    response = await axios.get(onePointUrl);
    const onePoint = response.data;

    assert.equal(onePoint.name, 'Tory Island');
  });

  test('create a point', async function () {
    const pointsUrl = 'https://desktop-tmdjo97:3000/api/points';
    const newPoint = {
      name: 'Test island',
      details: 'Test',
    };

    const response = await axios.post(pointsUrl, newPoint);
    const returnedPoint = response.data;
    assert.equal('201', response.status);

    assert.equal(returnedPoint.name, 'Test Island');
    assert.equal(returnedPoint.details, 'Test');
  });

});