const fs = require("fs");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    index: path.join(__dirname, "src/index.ts"),
    search: path.join(__dirname, "src/search.ts"),
    list: path.join(__dirname, "src/list.ts"),
    document: path.join(__dirname, "src/document.ts"),
    login: path.join(__dirname, "src/login.ts"),
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
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
    }
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
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
