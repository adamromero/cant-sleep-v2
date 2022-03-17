const mongoose = require("mongoose");

const LegendsSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true],
   },
   thumbnail: {
      type: String,
      required: [true],
   },
   content: {
      type: String,
      required: [true],
   },
});

module.exports = mongoose.model("Legends", LegendsSchema);
