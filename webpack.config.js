const path = require("path");

module.exports = {
  entry: "./src/js/popboy.js",
  output: {
    path: path.resolve(__dirname, "./src/js/"),
    filename: "popboy.bundle.js",
  },
};
