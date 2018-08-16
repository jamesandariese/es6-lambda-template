//const slsw = require("serverless-webpack");
//const nodeExternals = require("webpack-node-externals");

const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: fs.readdirSync(path.join(__dirname, "./lambdas"))
         .filter(filename => /\.js$/.test(filename))
         .map(filename => {
            var entry = {};
            entry[filename.replace(".js", "")] = path.join(
             __dirname,
             "./lambdas/",
             filename
           );
           return entry;
         })
         .reduce((finalObject, entry) => Object.assign(finalObject, entry), {}),
  target: "node",
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals({
    whitelist: [
      'babel-runtime/regenerator',
      'regenerator-runtime'
    ]
  })], // ignore all modules in node_modules folder EXCEPT the whitelist

  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "commonjs2",
    filename: "[name].js"
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};

