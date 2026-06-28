const router = require('express').Router();
const auth = require('../middleware/auth');
const pekerjaController = require('../controllers/webPekerjaController');

router.get('/pekerja/dashboard', auth, pekerjaController.dashboard);
router.get('/pekerja/absensi', auth, pekerjaController.showAbsensi);
router.post('/pekerja/clockin', auth, pekerjaController.clockIn);
router.post('/pekerja/clockout', auth, pekerjaController.clockOut);
router.get('/pekerja/riwayat', auth, pekerjaController.riwayat);

module.exports = router;
