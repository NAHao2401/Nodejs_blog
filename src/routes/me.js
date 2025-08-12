const express = require("express");
const router = express.Router();
const meController = require("../app/controllers/MeController");

router.get("/stored/courses", meController.storedCourses);
router.get("/trash/courses", meController.trashCourses);
router.post("/store-handle-form-actions", meController.handleFormStoreActions);
router.post("/trash-handle-form-actions", meController.handleFormTrashActions);

module.exports = router;
