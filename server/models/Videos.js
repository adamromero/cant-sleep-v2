const mongoose = require("mongoose");

const VideosSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true],
   },
   thumbnail: {
      data: Buffer,
      ContentType: String,
   },
   urlId: {
      type: String,
      required: [true],
   },
});

module.exports = mongoose.model("Videos", VideosSchema);
