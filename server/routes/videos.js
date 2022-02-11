const express = require("express");
const router = express.Router();
const {
   getVideos,
   addVideos,
   updateVideos,
   deleteVideos,
} = require("../controllers/videos");

router.route("/").get(getVideos).post(addVideos);
router.route("/:id").delete(deleteVideos).put(updateVideos);

module.exports = router;
