module.exports = () => ({
  plugins: [
    require("postcss-import")(),
    require("postcss-preset-env")({
      "autoprefixer": {
        grid: "autoplace",
      },
    }),
    require("cssnano")(),
  ],
});
