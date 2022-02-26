const express = require("express");
const router = express.Router();
const {
   getMysteries,
   getMystery,
   addMysteries,
   updateMysteries,
   deleteMysteries,
} = require("../controllers/mysteries");

router.route("/").get(getMysteries).post(addMysteries);
router
   .route("/:id")
   .delete(deleteMysteries)
   .put(updateMysteries)
   .get(getMystery);

module.exports = router;
