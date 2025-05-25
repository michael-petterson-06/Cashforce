const { users } = require('../models');

async function findAllUsers() {
  const allUsers = await users.findAll();
  return allUsers;
}

module.exports = { findAllUsers };
