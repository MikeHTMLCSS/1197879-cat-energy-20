const gulp = require("gulp");
const del = require("del");
const dest = require("gulp-dest");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const svgstore = require("svgstore");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const { src } = require("gulp");
const sync = require("browser-sync").create();

const delFunction = () => {
  return del("build");
};

exports.del = delFunction;

const copy = () => {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}", 
  "source/**.html",
  "source/img/**", 
  "source/js/**", 
  "source/*.ico"], {base: "source"}).pipe(gulp.dest("build"));
};

exports.copy = copy;

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build"));
};

exports.sprite = sprite;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);

exports.build = gulp.series(
  delFunction, copy, styles
);
