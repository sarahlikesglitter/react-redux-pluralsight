const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development", // this tells webpack what env to use
  target: "web", // could set this to node if needed for webpack to know what to use
  devtool: "cheap-module-source-map", // define the source map which allows us to see the original code in the browser when debugging
  entry: "./src/index", // where webpack needs to start
  output: {
    path: path.resolve(__dirname, "build"), // this won't write a file to build, but in memory it will serve from this directory
    publicPath: "/", // the public URL in the directory when it's referenced in the browser
    filename: "bundle.js", // the filename of the bundle, not created in reality, but webpack needs a name since it's going to be served in memory
  },
  devServer: {
    // webpack web server settings for development
    stats: "minimal", // reduces the info to the cmd line
    overlay: true, // overlay any errors that occur in the browser
    historyApiFallback: true, // all requests will be sent to index.html. This means we can use deep links that are all handled by react router
    // these next 3 are due to a Chrome issue, but may not be needed. If not needed, then just comment them out
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    // tell webpack what files you want it to handle
    rules: [
      {
        //javascript transpilation rules
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        //css rules
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
