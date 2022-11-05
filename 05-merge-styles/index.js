let fs = require('fs');
let path = require('path');
let bundleCss = path.join(__dirname, 'project-dist', 'bundle.css');
let styles = path.join(__dirname, 'styles');
fs.readdir(styles, 'utf-8', function (error, files) {
  if (error) {
    throw error;
  }
  fs.writeFile(bundleCss, '', function (error) {
    if (error) {
      throw error;
    }
  });
  files.forEach(function (file) {
    if (path.parse(path.join(styles, file)).ext === '.css') {
      let stream = fs.createReadStream(path.join(styles, file));
      stream.on('data', function (data) {
        fs.appendFile(bundleCss, data, function (error) {
          if (error) {
            throw error;
          }
        });
      });
    }
  });
});