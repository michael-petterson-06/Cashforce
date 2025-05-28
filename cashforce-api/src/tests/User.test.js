jest.mock('../services/UserService', () => ({
    findAllUsers: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    findUserById: jest.fn(),
    deleteUser: jest.fn(),
    findUserByEmail: jest.fn(),
  }));
  
  const request = require('supertest');
  const app = require('../server');
  
  const {
    findAllUsers,
    createUser,
    updateUser,
    findUserById,
    deleteUser,
    findUserByEmail,
  } = require('../services/UserService');
  
  const mockUser = {
    id: 1,
    name: 'MICHAEL',
    email: 'michael@email.com',
    phoneNumber: '1111-1111',
    mobile: '9999-9999',
    departament: 'TI',
  };
  
  describe('User Routes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('GET /users', () => {
      it('deve retornar todos os usuários', async () => {
        findAllUsers.mockResolvedValue([mockUser]);
  
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([mockUser]);
      });
  
      it('deve retornar erro 500 se falhar', async () => {
        findAllUsers.mockRejectedValue(new Error('DB Error'));
  
        const res = await request(app).get('/users');
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ message: 'Erro ao buscar usuários' });
      });
    });
  
    describe('GET /users/:id', () => {
      it('deve retornar um usuário pelo id', async () => {
        findUserById.mockResolvedValue(mockUser);
  
        const res = await request(app).get('/users/1');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockUser);
      });
  
      it('deve retornar 404 se o usuário não for encontrado', async () => {
        findUserById.mockResolvedValue(null);
  
        const res = await request(app).get('/users/999');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'Usuário não encontrado' });
      });
    });
  
    describe('POST /users', () => {
      it('deve criar um novo usuário', async () => {
        findUserByEmail.mockResolvedValue(null);
        createUser.mockResolvedValue(mockUser);
  
        const res = await request(app).post('/users').send({
          name: 'Michael',
          email: 'michael@email.com',
          phoneNumber: '1111-1111',
          mobile: '9999-9999',
          departament: 'TI',
        });
  
        expect(res.status).toBe(201);
        expect(res.body).toEqual(mockUser);
      });
  
      it('deve retornar 400 se nome ou email estiver faltando', async () => {
        const res = await request(app).post('/users').send({ name: '' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/Nome e email/);
      });
  
      it('deve retornar 400 se o email for inválido', async () => {
        const res = await request(app).post('/users').send({
          name: 'Michael',
          email: 'emailinvalido',
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/formato inválido/);
      });
  
      it('deve retornar 409 se o email já existir', async () => {
        findUserByEmail.mockResolvedValue(mockUser);
  
        const res = await request(app).post('/users').send({
          name: 'Michael',
          email: 'michael@email.com',
        });
        expect(res.status).toBe(409);
        expect(res.body.message).toMatch(/já está cadastrado/);
      });
    });
  
    describe('PUT /users/:id', () => {
      it('deve atualizar um usuário existente', async () => {
        const updatedData = {
          name: 'Novo Nome',
          email: 'michael@email.com',
          phoneNumber: '0000-0000',
          mobile: '9999-9999',
          departament: 'RH',
        };
  
        findUserById.mockResolvedValue({ id: 1 });
        findUserByEmail.mockResolvedValue({ id: 1 });
        updateUser.mockResolvedValue(true);
  
        const res = await request(app)
          .patch('/users/1')
          .send(updatedData);
  
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Usuário atualizado com sucesso');
      });
  
      it('deve retornar 404 se o usuário não existir', async () => {
        findUserById.mockResolvedValue(null);
  
        const res = await request(app).patch('/users/999').send({
          name: 'Qualquer',
          email: 'qualquer@email.com',
        });
  
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Usuário não encontrado');
      });
  
      it('deve retornar erro se o email for inválido', async () => {
        findUserById.mockResolvedValue({ id: 1 });
  
        const res = await request(app).patch('/users/1').send({
          name: 'Nome',
          email: 'invalido',
        });
  
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Email em formato inválido');
      });
  
      it('deve retornar erro se o email já estiver em uso por outro usuário', async () => {
        findUserById.mockResolvedValue({ id: 1 });
        findUserByEmail.mockResolvedValue({ id: 2 });
  
        const res = await request(app).patch('/users/1').send({
          name: 'Nome',
          email: 'usado@email.com',
        });
  
        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Este e-mail já está em uso por outro usuário.');
      });
    });
  
    describe('DELETE /users/:id', () => {
      it('deve excluir um usuário existente', async () => {
        findUserById.mockResolvedValue({ id: 1 });
        deleteUser.mockResolvedValue(true);
  
        const res = await request(app).delete('/users/1');
  
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Usuário excluído com sucesso');
      });
  
      it('deve retornar 404 se o usuário não for encontrado', async () => {
        findUserById.mockResolvedValue(null);
  
        const res = await request(app).delete('/users/99');
  
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Usuário não encontrado');
      });
    });
  });
  