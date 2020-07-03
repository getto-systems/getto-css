const fs = require("fs");
const path = require("path");

module.exports = {
  entry: {
    index: path.join(__dirname, "src/index.ts"),
    form: path.join(__dirname, "src/form.ts"),
    search: path.join(__dirname, "src/search.ts"),
    list: path.join(__dirname, "src/list.ts"),
    document: path.join(__dirname, "src/document.ts"),
    login: path.join(__dirname, "src/login.ts"),

    "docs/index": path.join(__dirname, "src/docs/index.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  devServer: devServer(),
};

function devServer() {
  if (!process.env.WEBPACK_DEV_SERVER) {
    return {};
  }

  return {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/dist/",

    host: "0.0.0.0",
    port: process.env.PUBLIC_APP_PORT,
    disableHostCheck: true,

    https: true,
    cert: fs.readFileSync(process.env.TLS_CERT),
    key: fs.readFileSync(process.env.TLS_KEY),

    hot: true,
    sockPort: `${process.env.LABO_PORT_PREFIX}${process.env.PUBLIC_PORT}`,
  };
}
