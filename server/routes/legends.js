const express = require("express");
const router = express.Router();
const {
   getLegends,
   addLegends,
   updateLegends,
   deleteLegends,
} = require("../controllers/legends");

router.route("/").get(getLegends).post(addLegends);
router.route("/:id").delete(deleteLegends).put(updateLegends);

module.exports = router;
