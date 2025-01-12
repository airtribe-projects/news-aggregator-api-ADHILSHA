const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/preferences',authMiddleware, userController.preferences);
router.put('/preferences',authMiddleware, userController.updatePreferences);

module.exports = router;