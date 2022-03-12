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
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid credentials");
      //res.status(400).json({ message: "Invalid credentials" });
   }
});

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      //expiresIn: "30d",
   });
};

module.exports = {
   userAdmin,
};
