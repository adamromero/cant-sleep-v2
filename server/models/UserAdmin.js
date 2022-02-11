const mongoose = require("mongoose");

const userAdminSchema = mongoose.Schema({
   username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
   },
   password: {
      type: String,
      required: [true, "Please enter password"],
   },
});

module.exports = mongoose.model("UserAdmin", userAdminSchema);
