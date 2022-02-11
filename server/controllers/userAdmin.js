const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserAdmin = require("../models/UserAdmin");

const userAdmin = asyncHandler(async (req, res) => {
   const { username, password } = req.body;

   const user = await UserAdmin.findOne({ username });

   if (user && password === user.password) {
      res.json({
         _id: user.id,
         username: user.username,
      });
   } else {
      res.status(400);
      throw new Error("Invalid credentials");
   }
});

module.exports = {
   userAdmin,
};
