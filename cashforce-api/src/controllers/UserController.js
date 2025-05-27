const { findAllUsers, createUser, updateUser, findUserById, deleteUser } = require('../services/UserService');

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

  async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await findUserById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log('[UserController] Erro ao buscar usuário:', error?.message || error);
      return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  },

  async create(req, res) {
    try {
      const { name, email, phoneNumber, mobile, departament } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: 'Nome e email são obrigatórios' });
      }

      const newUser = await createUser({ name: name?.toUpperCase(), email, phoneNumber, mobile, departament });

      return res.status(201).json(newUser);
    } catch (error) {
      console.log('[UserController] Erro ao criar usuário:', error?.message || error);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const existingUser = await findUserById(id);
      if (!existingUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const { name, email, phoneNumber, mobile, departament } = req.body;
      const updated = await updateUser(id, { name: name?.toUpperCase(), email, phoneNumber, mobile, departament });

      return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      console.log('[UserController] Erro ao atualizar usuário:', error?.message || error);
      return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await findUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await deleteUser(id);
      return res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.log('[UserController] Erro ao deletar usuário:', error?.message || error);
      return res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  }
};

module.exports = UserController;
