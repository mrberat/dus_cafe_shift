const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const auth_controller=require("../controllers/authController");


router.get('/', authMiddleware, userController.getUsers);
router.post('/', userController.createUser);
router.get('/logout', auth_controller.logout);


module.exports = router;
