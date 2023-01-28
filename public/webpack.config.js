/* eslint-disable */
const path = require("path")

const TerserPlugin = require("terser-webpack-plugin")

const environment = require("../env/environment")
const entryPoint = require("../env/entry_point")

module.exports = {
    entry: entryPoint.findEntries(),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "dist/[name].js",
        globalObject: "self",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader", options: { injectType: "linkTag" } },
                    "file-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["postcss-import"],
                                    ["postcss-custom-media"],
                                    ["postcss-custom-selectors"],
                                    ["autoprefixer"],
                                ],
                            },
                        },
                    },
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
        minimize: environment.isProduction(),
        minimizer: [new TerserPlugin()],
    },
    watchOptions: {
        ignored: /(node_modules|.git)/,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
            publicPath: "/dist/",
        },

        host: "0.0.0.0",
        port: process.env.PUBLIC_APP_PORT,

        proxy: [
            {
                context: ["/dist/auth/sign", "/dist/avail"],
                target: `http://localhost:${process.env.PUBLIC_APP_PORT}`,
                pathRewrite: { "^/dist": "" },
            },
        ],

        hot: true,
        client: {
            webSocketURL: `wss://${webSocketHost()}/ws`,
        },
        allowedHosts: "all",
    },
}

function webSocketHost() {
    if (!process.env.PUBLIC_SERVER_URL) {
        return "localhost"
    }
    return new URL(process.env.PUBLIC_SERVER_URL).host
}
