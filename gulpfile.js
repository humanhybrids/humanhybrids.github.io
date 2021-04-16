const gulp = require('gulp');
const cp = require('child_process');
const map = require('map-stream');
const path = require('path');

const images = {
  full: './images',
  sm: './images-sm',
  lg: './images-lg'
};

function createImage(src, scale, dest) {
  return new Promise(
      (resolve, reject) => cp.exec(
          `ffmpeg -i \"${src}\" -vf scale=${scale} -y \"${dest}\"`,
          (err, out) => (err ? reject(err) : resolve(out))));
}

gulp.task(
    'generate-images',
    () => gulp.src(`${images.full}/*.{png,jpg,gif}`).pipe(map(async (file, cb) => {
      const name = path.basename(file.path);
      const src = path.join(images.full, name);
      try {
        await Promise.all([
          createImage(src, '-1:400', path.join(images.sm, name)),
          createImage(src, '-1:1200', path.join(images.lg, name))
        ]);
        cb(null, file);
      } catch (err) {
        cb(err, file);
      }
    })));
