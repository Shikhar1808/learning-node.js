const express = require('express');
const userControllers = require('./../controllers/userController.js')
const router = express.Router();

router.route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createUser);

router.route('/:id')
    .get(userControllers.getUser)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser);

module.exports = router;
