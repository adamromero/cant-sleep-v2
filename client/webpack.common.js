const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
   entry: "./src/index.js",
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
      }),
      new Dotenv({
         //ignoreStub: true,
      }),
   ],
   resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
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
