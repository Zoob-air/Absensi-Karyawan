const router = require('express').Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/webAuthController');

router.get('/', authController.showLogin);
router.post('/login', authController.login);
router.get('/dashboard', authController.redirectDashboard);
router.get('/reset-password', auth, authController.showResetPassword);
router.post('/reset-password', auth, authController.resetPassword);
router.get('/logout', authController.logout);

module.exports = router;
