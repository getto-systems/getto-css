module.exports = () => ({
  plugins: [
    require("postcss-import")(),
    require("postcss-preset-env")({
      stage: 0,
      autoprefixer: {
        grid: "autoplace",
      },
    }),
    require("cssnano")(),
  ],
});
