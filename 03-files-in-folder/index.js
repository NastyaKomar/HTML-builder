let path = require('path');
let fs = require('fs');
let infoFiles = function (file) {
  let data = [];
  if (file.isFile()) {
    fs.stat(path.resolve(__dirname, 'secret-folder', file.name), function (error, stats) {
      if (error) {
        return console.log(error);
      }
      data.push(file.name.split('.').slice(0, -1).join('.'));
      data.push(path.extname(file.name).slice(1));
      data.push((Math.round(stats.size / 1024)) + 'Kb');
      console.log(data.join(' - '));
    });
  }
};
fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, function (error, files) {
  if (error) {
    return console.log(error);
  }
  files.forEach(item => {
    infoFiles(item);
  });
});