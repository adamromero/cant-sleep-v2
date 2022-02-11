const mongoose = require("mongoose");

const LegendsSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true],
   },
   thumbnail: {
      data: Buffer,
      ContentType: String,
   },
   story: {
      type: String,
      required: [true],
   },
});

module.exports = mongoose.model("Legends", LegendsSchema);
