const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "node",
  // mode: "production",
  entry: {
    popboy: "./src/js/popboy.js",
    popup: "./src/js/popup.js",
  },
  output: {
    path: path.resolve(__dirname, "./src/js/"),
    filename: "../../build/js/[name].bundle.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/",
          to: "../../build/",
          globOptions: {
            ignore: ["**/helpers/**", "**/popboy.js", "**/popup.js"],
          },
        },
      ],
    }),
  ],
};
