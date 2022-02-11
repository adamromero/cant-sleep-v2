const express = require("express");
const router = express.Router();
const { userAdmin } = require("../controllers/userAdmin");

router.post("/", userAdmin);

module.exports = router;
