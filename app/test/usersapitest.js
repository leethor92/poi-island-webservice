'use strict';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const assert = require('chai').assert;
const PointService = require('./point-service');
const _ = require('lodash');
const fixtures = require('./fixtures.json');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const pointService = new PointService(fixtures.pointService);

  setup(async function () {
    await pointService.deleteAllUsers();
  });

  teardown(async function () {
    await pointService.deleteAllUsers();
  });

  test('create a user', async function () {
    const returnedUser = await pointService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get user', async function () {
    const u1 = await pointService.createUser(newUser);
    const u2 = await pointService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test('get invalid user', async function () {
    const u1 = await pointService.getUser('1234');
    assert.isNull(u1);
    const u2 = await pointService.getUser('012345678901234567890123');
    assert.isNull(u2);
  });


  test('delete a user', async function () {
    let u = await pointService.createUser(newUser);
    assert(u._id != null);
    await pointService.deleteOneUser(u._id);
    u = await pointService.getUser(u._id);
    assert(u == null);
  });

  test('get all users', async function () {
    for (let u of users) {
      await pointService.createUser(u);
    }

    const allUsers = await pointService.getUsers();
    assert.equal(allUsers.length, users.length);
  });

  test('get users detail', async function () {
    for (let u of users) {
      await pointService.createUser(u);
    }

    const allUsers = await pointService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });

  test('get all users empty', async function () {
    const allUsers = await pointService.getUsers();
    assert.equal(allUsers.length, 0);
  });

});