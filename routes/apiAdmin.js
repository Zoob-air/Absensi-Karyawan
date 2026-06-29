const router = require('express').Router();
const apiAuth = require('../middleware/apiAuth');
const apiAdmin = require('../middleware/apiAdmin');
const apiAdminController = require('../controllers/apiAdminController');

router.get('/api/admin/dashboard', apiAuth, apiAdmin, apiAdminController.dashboard);
router.get('/api/admin/users', apiAuth, apiAdmin, apiAdminController.users);
router.post('/api/admin/users', apiAuth, apiAdmin, apiAdminController.addUser);
router.put('/api/admin/users/:id', apiAuth, apiAdmin, apiAdminController.updateUser);
router.delete('/api/admin/users/:id', apiAuth, apiAdmin, apiAdminController.deleteUser);
router.post('/api/admin/users/:id/reset-password', apiAuth, apiAdmin, apiAdminController.resetPassword);
router.get('/api/admin/riwayat', apiAuth, apiAdmin, apiAdminController.riwayat);
router.get(
    "/api/admin/riwayat/:id",
    apiAuth,
    apiAdmin,
    apiAdminController.detailRiwayat
);

module.exports = router;
