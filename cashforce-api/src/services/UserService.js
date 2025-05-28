const { users } = require('../models');

async function findAllUsers() {
  return await users.findAll();
}

async function findUserById(id) {
  return await users.findByPk(id);
}

async function createUser(data) {
  return await users.create(data);
}

async function updateUser(id, data) {
  const [updatedCount] = await users.update(data, { where: { id } });
  return updatedCount > 0;
}

async function deleteUser(id) {
  return await users.destroy({ where: { id } });
}

async function findUserByEmail(email) {
  return await users.findOne({ where: { email } });
}

module.exports = {
  findAllUsers,
  createUser,
  updateUser,
  findUserById,
  deleteUser,
  findUserByEmail,
};
