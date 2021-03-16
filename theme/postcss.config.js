/* eslint-disable */
module.exports = () => ({
    plugins: [
        require("postcss-import")(),
        require("postcss-preset-env")({
            stage: 0,
            browsers: "> 3%",
            autoprefixer: {
                grid: "autoplace",
            },
        }),
        require("cssnano")(),
    ],
})
