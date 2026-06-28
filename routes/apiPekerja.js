const router = require('express').Router();
const apiAuth = require('../middleware/apiAuth');
const apiPekerjaController = require('../controllers/apiPekerjaController');

router.get('/api/pekerja/test', (req, res) => {
    res.json({ success: true, message: 'API pekerja aktif' });
});

router.get('/api/pekerja/dashboard', apiAuth, apiPekerjaController.dashboard);
router.get('/api/pekerja/absensi/today', apiAuth, apiPekerjaController.today);
router.post('/api/pekerja/clockin', apiAuth, apiPekerjaController.clockIn);
router.post('/api/pekerja/clockout', apiAuth, apiPekerjaController.clockOut);
router.get('/api/pekerja/riwayat', apiAuth, apiPekerjaController.riwayat);

module.exports = router;
