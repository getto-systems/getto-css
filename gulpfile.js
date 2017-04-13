var gulp = require("gulp");
var connect = require("gulp-connect");

gulp.task("build", function(){
  var postcss = require("gulp-postcss");
  var sourcemaps = require("gulp-sourcemaps");

  return gulp.src("src/getto-admin.css")
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
    .pipe( gulp.dest("public/dist/") )
});

gulp.task("dist", function(){
  gulp.src("public/dist/*.css")
    .pipe( connect.reload() )
});
gulp.task("html", function(){
  gulp.src("public/*.html")
    .pipe( connect.reload() )
});

gulp.task("livereload", function(){
  connect.server({
    port: 8000,
    root: "public/",
    livereload: true
  });
  gulp.watch("src/**/*.css",["build"]);
  gulp.watch("public/dist/*.css",["dist"]);
  gulp.watch("public/*.html",["html"]);
});
