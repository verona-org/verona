const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const browserSync = require("browser-sync").create()
const fileInclude = require("gulp-file-include")
const clean = require("gulp-clean")
const postcss = require("gulp-postcss")
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")

// Пути к файлам
const paths = {
	src: {
		html: "src/**/*.html",
		scss: "src/scss/**/*.scss",
		js: "src/js/**/*.js",
		assets: "src/assets/**/*",
		partials: "src/partials/**/*.html",
		tailwindConfig: "tailwind.config.js",
	},
	dist: {
		base: "dist/",
		css: "dist/css/",
		js: "dist/js/",
		assets: "dist/assets/",
	},
}

// Обработчик ошибок
const errorHandler = notify.onError({
	title: "Gulp Error",
	message: "Error: <%= error.message %>",
	sound: false,
})

// Очистка dist
function cleanDist() {
	return gulp.src("dist", { read: false, allowEmpty: true }).pipe(clean())
}

// HTML обработка
function html() {
	return gulp
		.src(paths.src.html)
		.pipe(plumber({ errorHandler }))
		.pipe(
			fileInclude({
				prefix: "@@",
				basepath: "@file",
			})
		)
		.pipe(gulp.dest(paths.dist.base))
		.pipe(browserSync.stream())
}

// SCSS + Tailwind обработка
function styles() {
	return gulp
		.src(paths.src.scss)
		.pipe(plumber({ errorHandler }))
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss([tailwindcss(paths.src.tailwindConfig), autoprefixer()]))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.dist.css))
		.pipe(browserSync.stream())
}

// JS обработка
function scripts() {
	return gulp
		.src(paths.src.js)
		.pipe(plumber({ errorHandler }))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.dist.js))
		.pipe(browserSync.stream())
}

// Копирование ассетов
function assets() {
	return gulp.src(paths.src.assets).pipe(gulp.dest(paths.dist.assets)).pipe(browserSync.stream())
}

// Наблюдение за изменениями
function watch() {
	browserSync.init({
		server: {
			baseDir: paths.dist.base,
			serveStaticOptions: {
				extensions: ["html"],
			},
		},
		port: 3000,
		open: false,
		notify: false,
	})

	// Отслеживание HTML и partials
	gulp.watch([paths.src.html, paths.src.partials], html).on("change", browserSync.reload)

	// Отслеживание SCSS
	gulp.watch(paths.src.scss, styles)

	// Отслеживание JS
	gulp.watch(paths.src.js, scripts)

	// Отслеживание ассетов
	gulp.watch(paths.src.assets, assets)

	// Особое отслеживание конфига Tailwind и классов
	gulp.watch([paths.src.tailwindConfig, "src/**/*.html", "src/**/*.js"], gulp.series(styles, html))
}

// Сборка проекта
const build = gulp.series(cleanDist, gulp.parallel(html, styles, scripts, assets))

// Разработка
const dev = gulp.series(build, watch)

// Экспорт задач
exports.clean = cleanDist
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.assets = assets
exports.build = build
exports.dev = dev
exports.default = dev
