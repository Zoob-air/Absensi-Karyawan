const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const adminController = require('../controllers/webAdminController');

router.get('/admin/dashboard', auth, admin, adminController.dashboard);

router.get('/admin/users', auth, admin, adminController.users);
router.get('/admin/users/add', auth, admin, adminController.showAddUser);
router.post('/admin/users/add', auth, admin, adminController.addUser);
router.get('/admin/users/edit/:id', auth, admin, adminController.showEditUser);
router.post('/admin/users/edit/:id', auth, admin, adminController.updateUser);
router.get('/admin/users/delete/:id', auth, admin, adminController.deleteUser);
router.post('/admin/users/reset-password/:id', auth, admin, adminController.resetUserPassword);

router.get('/admin/riwayat', auth, admin, adminController.riwayat);
router.get('/admin/riwayat/export/excel', auth, admin, adminController.exportExcel);
router.get('/admin/riwayat/export/pdf', auth, admin, adminController.exportPdf);

module.exports = router;
