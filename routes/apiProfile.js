const router = require("express").Router();
const apiAuth = require("../middleware/apiAuth");
const profileController = require("../controllers/apiProfileController");

router.get("/api/profile", apiAuth, profileController.getProfile);
router.put("/api/profile", apiAuth, profileController.updateProfile);
router.put("/api/profile/password", apiAuth, profileController.changePassword);

module.exports = router;