const path = require("path");

module.exports = {
  entry: "./src/js/popboy.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "popboy.bundle.js",
  },
};
