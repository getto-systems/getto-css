var gulp = require("gulp");

path = {
  root: "public/",
  dist: "public/dist/",
  src: "src/**/*.css"
};

gulp.task("build", function(){
  var postcss = require("gulp-postcss");
  var sourcemaps = require("gulp-sourcemaps");

  return gulp.src("src/getto.css")
    .pipe( sourcemaps.init() )
    .pipe( postcss([
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
    ]) )
    .pipe( sourcemaps.write(".") )
    .pipe( gulp.dest(path.dist) )
});

gulp.task("livereload", function(){
  gulp.src(path.root)
    .pipe( require("gulp-server-livereload")({
      host: "0.0.0.0",
      livereload: {enable: true, port: process.env.LABO_PORT_PREFIX + "29"},
      open: true
    }) );
  gulp.watch(path.src,["build"]);
});
