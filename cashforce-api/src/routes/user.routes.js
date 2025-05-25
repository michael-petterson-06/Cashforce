const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get('/users', UserController.findAll);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               mobile:
 *                 type: string
 *               departament:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/users', UserController.create);


module.exports = router;
