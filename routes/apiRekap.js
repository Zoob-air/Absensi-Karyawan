const router = require('express').Router();

const apiAuth = require('../middleware/apiAuth');
const apiAdmin = require('../middleware/apiAdmin');
const apiRekapController = require('../controllers/apiRekapController');

router.post('/api/admin/rekap/generate', apiAuth, apiAdmin, apiRekapController.generate);
router.get('/api/admin/rekap', apiAuth, apiAdmin, apiRekapController.index);

module.exports = router;