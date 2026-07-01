const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const apiAuth = require('../middleware/apiAuth');
const apiPekerjaController = require('../controllers/apiPekerjaController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/absensi');
    },
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.get('/api/pekerja/test', (req, res) => {
    res.json({ success: true, message: 'API pekerja aktif' });
});

router.get('/api/pekerja/dashboard', apiAuth, apiPekerjaController.dashboard);
router.get('/api/pekerja/absensi/today', apiAuth, apiPekerjaController.today);

router.post(
    '/api/pekerja/clockin',
    apiAuth,
    upload.single('foto'),
    apiPekerjaController.clockIn
);

router.post(
    '/api/pekerja/clockout',
    apiAuth,
    upload.single('foto'),
    apiPekerjaController.clockOut
);

router.get('/api/pekerja/riwayat', apiAuth, apiPekerjaController.riwayat);

module.exports = router;