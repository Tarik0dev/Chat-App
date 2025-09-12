const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const authController = require('../controllers/authController')
router.post('/', authController.login)


const registerController = require('../controllers/registerController')
router.post('/register', registerController.register)

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Bienvenue sur le dashboard, ${req.user.email}` });
});

module.exports = router
