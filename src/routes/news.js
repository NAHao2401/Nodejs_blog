const express = require("express");
const router = express.Router();
const newsController = require("../app/controllers/NewController");
const SiteController = require("../app/controllers/SiteController");

router.use("/", newsController.index);

module.exports = router;
