const router = require('express').Router();

const apiAuth = require('../middleware/apiAuth');
const apiAdmin = require('../middleware/apiAdmin');
const apiSawController = require('../controllers/apiSawController');

router.post('/api/admin/saw/generate', apiAuth, apiAdmin, apiSawController.generate);
router.get('/api/admin/saw', apiAuth, apiAdmin, apiSawController.index);
router.get('/api/admin/saw/:id', apiAuth, apiAdmin, apiSawController.detail);
module.exports = router;