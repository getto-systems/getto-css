/* eslint-disable */
const path = require("path")

const TerserPlugin = require("terser-webpack-plugin")

const entryPoint = require("../entryPoint")

module.exports = {
    entry: () => {
        return entryPoint.findEntries().reduce((acc, name) => {
            acc[entryPoint.toEntryName(name)] = toMainPath(name)
            return acc
        }, {})

        function toMainPath(name) {
            return toPath("main", name)
        }
        function toPath(type, name) {
            return path.join(__dirname, "../lib/z_main", entryPoint.toEntryPath(name), `${type}.ts`)
        }
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
                    { loader: "style-loader", options: { injectType: "linkTag" } },
                    "file-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                resolve: {
                    extensions: [".ts"],
                },
            },
        ],
    },
    optimization: {
        minimize: process.env.BUILD_ENV == "production",
        minimizer: [new TerserPlugin()],
    },
    watchOptions: {
        ignored: /(node_modules|.git)/,
    },
    devServer: {
        contentBase: path.join(__dirname, "."),
        publicPath: "/dist/",

        host: "0.0.0.0",
        port: process.env.PUBLIC_APP_PORT,

        hot: true,
        sockPort: "443",

        disableHostCheck: true,
    },
}
