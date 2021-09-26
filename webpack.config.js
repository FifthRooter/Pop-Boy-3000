const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "node",
  entry: "./src/js/popboy.js",
  output: {
    path: path.resolve(__dirname, "./src/js/"),
    filename: "../../build/js/popboy.bundle.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/",
          to: "../../build/",
          globOptions: {
            ignore: ["**/helpers/**", "**/popboy.js"],
          },
        },
      ],
    }),
  ],
};
