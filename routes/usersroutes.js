const express = require('express');
const router = express.Router();
const usersController = require('../controlers/user_controler');
 
router.post('/register', usersController.register);
router.post('/login', usersController.loginUser);
router.get('/allusers', usersController.getAllUsers);
router.get('/singleuser/:id', usersController.getUserById);
router.delete('/deleteuser/:id', usersController.deleteUser);
router.put('/changeUserRole', usersController.changeUserRole)


module.exports = router;