let fs = require('fs/promises');
let path = require('path');
let files = path.join(__dirname, 'files');
let filesCopy = path.join(__dirname, 'files-copy');

fs.rm(filesCopy, {
  recursive: true,
  force: true
}).finally(function () {
  fs.mkdir(filesCopy, {
    recursive: true
  });
  fs.readdir(files, {
    withFileTypes: true
  }).then(function (data) {
    data.forEach(function (item) {
      if (item.isFile()) {
        let pathItem = path.join(files, item.name);
        let pathItemDes = path.join(filesCopy, item.name);
        fs.copyFile(pathItem, pathItemDes);
      }
    });
  });
});