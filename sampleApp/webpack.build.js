const path = require('path');
const uglifyPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

// toggle the following 3 config settings to customize build
const babel = true;
const minify = true;
const createMap = false;

let rules = [];
if (babel) rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use : {
    loader: 'babel-loader',
    options: {
      presets: ['env'],
      plugins: ['transform-object-rest-spread'],
    },
  },
});

let plugins = [];
if (minify) plugins.push(new uglifyPlugin({ minimize: true }));

let devtools = undefined;
if (createMap) devtools = 'source-map';


module.exports = {
  entry: {
    app: ["./client/index.js"],
  },
  output: {
    filename: "static/app.js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
  },
  devtool: devtools,
  plugins: plugins,
  module: {
    rules: rules,
  },
};