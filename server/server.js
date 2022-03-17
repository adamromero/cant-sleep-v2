const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
//const fileUpload = require("express-fileupload");
const app = express();
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(fileUpload());

app.use("/legends", require("./routes/legends"));
app.use("/mysteries", require("./routes/mysteries"));
app.use("/videos", require("./routes/videos"));
app.use("/login", require("./routes/userAdmin"));
app.use("/aws-upload", require("./routes/aws"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
