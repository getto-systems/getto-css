"use strict";
const gulp = require("gulp");
const pump = require("pump");

const path = {
  root: "public/",
  dist: "public/dist/",
  src: "src/**/*.css"
};

gulp.task("build", function(cb){
  var postcss = require("gulp-postcss");
  var sourcemaps = require("gulp-sourcemaps");

  pump([
    gulp.src("src/getto.css"),
    sourcemaps.init(),
    postcss([
      require("postcss-import")({
        "plugins": [
          require("stylelint")({
            "config": {
              "extends": "stylelint-config-standard",
              "rules": {
                "at-rule-empty-line-before": null,
                "property-no-unknown": null,
                "declaration-empty-line-before": null,
                "custom-property-empty-line-before": null
              }
            }
          })
        ]
      }),
      require("postcss-bem"),
      require("lost"),
      require("postcss-utilities"),
      require("postcss-custom-properties"),
      require("postcss-apply"),
      require("postcss-calc"),
      require("postcss-custom-media"),
      require("postcss-nested"),
      require("postcss-color-function"),
      require("postcss-color-gray"),
      require("postcss-initial"),
      require("pixrem"),
      require("postcss-selector-matches"),
      require("postcss-selector-not"),

      require("autoprefixer"),
      require("postcss-reporter")({"clearMessages": true}),
      require("cssnano")
    ]),
    sourcemaps.write("."),
    gulp.dest(path.dist),
  ],cb);
});

gulp.task("livereload", function(cb){
  pump([
    gulp.src(path.root),
    require("gulp-server-livereload")({
      host: "0.0.0.0",
      livereload: {enable: true, port: process.env.LABO_PORT_PREFIX + "29"},
      open: true
    }),
  ],cb);
  gulp.watch(path.src,["build"]);
});
