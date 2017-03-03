var gulp = require("gulp");
var cp = require("child_process");
var fs = require("fs");
var babel = require("gulp-babel");
var realFavicon = require('gulp-real-favicon');

gulp.task("install", function () {
	return cp.exec("npm install");
});

gulp.task("paths", ["install"], function () {
	cp.exec("bower list --paths --json", function (err, stdout) {
		if (err) {
			console.warn(err);
			return;
		}
		var paths = JSON.parse(stdout.replace(/\.js/g, ""));
		for (var id in paths) {
			paths[id] = "/" + paths[id];
		}
		fs.writeFile("js/data/paths.json", JSON.stringify(paths, null, 4), e => console.log("js/data/paths.json written"));
	});
});

function transpile(source, dest) {
	return gulp.src(source)
		.pipe(babel())
		.pipe(gulp.dest(dest));
}

gulp.task("asteroids-transpile", ["install"], function () {
	transpile("asteroids/js/**/*.js", "asteroids/bin");
	return gulp.watch("asteroids/js/**/*.js", e => {
		transpile(e.path, "asteroids/bin");
	});
});

gulp.task("pokekombat-transpile", ["install"], function () {
	transpile("pokekombat/*.js", "pokekombat/bin");
	return gulp.watch("pokekombat/*.js", e => {
		transpile(e.path, "pokekombat/bin");
	});
});

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. git,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function (done) {
	realFavicon.generateFavicon({
		masterPicture: 'assets/hhlogo_left.png',
		dest: './',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#453453',
				margin: '18%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'whiteSilhouette',
				backgroundColor: '#603cba',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: true,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#453453',
				manifest: {
					name: 'humanhybrids',
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#453453'
			}
		},
		settings: {
			compression: 2,
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function () {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function () {
	return gulp.src(['TODO: List of the HTML files where to inject favicon markups'])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function (done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
	});
});

gulp.task("default", ["paths", "asteroids-transpile", "pokekombat-transpile"]);
