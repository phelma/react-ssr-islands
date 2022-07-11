const nodeExternals = require("webpack-node-externals");
const path = require("path");

const js = {
  test: /\.jsx?/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "index.js": path.resolve(__dirname, "src/server.js"),
  },
  module: {
    rules: [js],
  },
  output: {
    path: path.resolve(__dirname, "dist/server"),
    filename: "[name]",
  },
};

const clientConfig = {
  stats: 'normal',
  mode: "development",
  target: "web",
  entry: {
    "main": path.resolve(__dirname, "src/client.jsx"),
  },
  module: {
    rules: [js],
  },
  output: {
    path: path.resolve(__dirname, "dist/client"),
    filename: "[name].bundle.js",
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   }
  // },
};

module.exports = [serverConfig, clientConfig];
