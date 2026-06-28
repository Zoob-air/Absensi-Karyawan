const router = require('express').Router();
const apiAuth = require('../middleware/apiAuth');
const apiAuthController = require('../controllers/apiAuthController');

router.post('/api/login', apiAuthController.login);
router.get('/api/me', apiAuth, apiAuthController.me);
router.post('/api/logout', apiAuth, apiAuthController.logout);

module.exports = router;
