const express = require("express");
const router = express.Router();
const setThumbnailImage = require("../controllers/aws");

router.route("/").post(setThumbnailImage);

module.exports = router;
