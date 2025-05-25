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

module.exports = router;
