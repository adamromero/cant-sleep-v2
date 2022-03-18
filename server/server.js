const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/legends", require("./routes/legends"));
app.use("/api/mysteries", require("./routes/mysteries"));
app.use("/api/videos", require("./routes/videos"));
app.use("/api/login", require("./routes/userAdmin"));
app.use("/api/aws-upload", require("./routes/aws"));

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../client/dist")));

   app.get("*", (req, res) =>
      res.sendFile(
         path.resolve(__dirname, "../", "client", "dist", "index.html")
      )
   );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
