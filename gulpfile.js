import autoprefixer from "autoprefixer"
import browserSyncLib from "browser-sync"
import gulp from "gulp"
import clean from "gulp-clean"
import fileInclude from "gulp-file-include"
import notify from "gulp-notify"
import plumber from "gulp-plumber"
import postcss from "gulp-postcss"
import gulpSass from "gulp-sass"
import sourcemaps from "gulp-sourcemaps"
import dartSass from "sass"
import tailwindcss from "tailwindcss"

// Инициализация
const sass = gulpSass(dartSass)
const browserSync = browserSyncLib.create()

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
export function cleanDist() {
	return gulp.src(paths.dist.base, { read: false, allowEmpty: true }).pipe(clean())
}

// HTML обработка
export function html() {
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
export function styles() {
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
export function scripts() {
	return gulp
		.src(paths.src.js)
		.pipe(plumber({ errorHandler }))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.dist.js))
		.pipe(browserSync.stream())
}

// Копирование ассетов (все файлы из assets, включая шрифты, изображения и иконки) с сохранением структуры
export function assets() {
	return gulp
		.src(paths.src.assets, { base: "src/assets" })
		.pipe(plumber({ errorHandler }))
		.pipe(gulp.dest(paths.dist.assets))
		.pipe(browserSync.stream())
}

// Наблюдение за изменениями
export function watchFiles() {
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

	gulp.watch([paths.src.html, "src/partials/**/*.html"], html).on("change", browserSync.reload)
	gulp.watch(paths.src.scss, styles)
	gulp.watch(paths.src.js, scripts)
	gulp.watch(paths.src.assets, assets)
	gulp.watch([paths.src.tailwindConfig, "src/**/*.html", "src/**/*.js"], gulp.series(styles, html))
}

// Сборка проекта
export const build = gulp.series(cleanDist, gulp.parallel(html, styles, scripts, assets))

// Разработка
export const dev = gulp.series(build, watchFiles)

// Экспорт по умолчанию
export default dev
