const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/users', UserController.findAll);
router.get('/users/:id', UserController.findById);
router.post('/users', UserController.create);
router.patch('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);


module.exports = router;
