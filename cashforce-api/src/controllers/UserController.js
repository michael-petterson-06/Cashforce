const { findAllUsers } = require('../services/UserService');

const UserController = {
  async findAll(req, res) {
    try {
        const users = await findAllUsers();
      return res.status(200).json(users);
    } catch (error) {
        console.log('[UserController] Erro ao buscar usuários:', error?.message || error);
      return res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  }
};

module.exports = UserController;
