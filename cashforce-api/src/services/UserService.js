const { users } = require('../models');

async function findAllUsers() {
  const allUsers = await users.findAll();
  return allUsers;
}

async function createUser(data) {
    return await users.create(data);
  }

  module.exports = { findAllUsers, createUser };
