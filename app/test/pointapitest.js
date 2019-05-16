'use strict';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const assert = require('chai').assert;
const axios = require('axios');

suite('Point API tests', function () {

  test('get points',async function () {
    const response = await axios.get('https://desktop-tmdjo97:3000/api/points');
    const points = response.data;
    assert.equal(3, points.length);

  });
});