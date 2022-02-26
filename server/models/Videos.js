const mongoose = require("mongoose");

const VideosSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true],
   },
   thumbnail: {
      type: String,
      required: [true],
   },
   urlId: {
      type: String,
      required: [true],
   },
});

module.exports = mongoose.model("Videos", VideosSchema);
