'use strict';

const assert = require('chai').assert;
const PointService = require('./point-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

suite('Point API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const pointService = new PointService(fixtures.pointService);

  setup(async function () {
    await pointService.deleteAllUsers();
  });


    test('authenticate', async function () {
      const returnedUser = await pointService.createUser(newUser);
      const response = await pointService.authenticate(newUser);
      assert(response.success);
      assert.isDefined(response.token);
    });

    test('verify Token', async function () {
      const returnedUser = await pointService.createUser(newUser);
      const response = await pointService.authenticate(newUser);

      const userInfo = utils.decodeToken(response.token);
      assert.equal(userInfo.email, returnedUser.email);
      assert.equal(userInfo.userId, returnedUser._id);
    });

});