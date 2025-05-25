const { findAllUsers, createUser } = require('../services/UserService');

const UserController = {
  async findAll(req, res) {
    try {
      const users = await findAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.log('[UserController] Erro ao buscar usuários:', error?.message || error);
      return res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  },

  async create(req, res) {
    try {
      const { name, email, phoneNumber, mobile, departament } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: 'Nome e email são obrigatórios' });
      }

      const newUser = await createUser({ name, email, phoneNumber, mobile, departament });

      return res.status(201).json(newUser);
    } catch (error) {
      console.log('[UserController] Erro ao criar usuário:', error?.message || error);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }
};

module.exports = UserController;
