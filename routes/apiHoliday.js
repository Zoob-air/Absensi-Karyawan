const router = require('express').Router();

const apiAuth = require('../middleware/apiAuth');
const apiAdmin = require('../middleware/apiAdmin');
const apiHolidayController = require('../controllers/apiHolidayController');

router.get('/api/admin/hari-libur', apiAuth, apiAdmin, apiHolidayController.index);
router.post('/api/admin/hari-libur', apiAuth, apiAdmin, apiHolidayController.store);
router.put('/api/admin/hari-libur/:id', apiAuth, apiAdmin, apiHolidayController.update);
router.delete('/api/admin/hari-libur/:id', apiAuth, apiAdmin, apiHolidayController.destroy);

module.exports = router;