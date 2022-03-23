const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
   mode: "production",
   output: {
      filename: "bundle.[hash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "./",
      clean: true,
   },
};
