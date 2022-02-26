const mongoose = require("mongoose");

const MysteriesSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true],
   },
   thumbnail: {
      type: String,
      required: [true],
   },
   story: {
      type: String,
      required: [true],
   },
});

module.exports = mongoose.model("Mysteries", MysteriesSchema);
