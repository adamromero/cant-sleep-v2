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
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: require.resolve("babel-loader"),
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
         },
         {
            test: /\.png|svg|jpg|gif$/,
            use: ["file-loader"],
         },
      ],
   },
};
