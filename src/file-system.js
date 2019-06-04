const fs = require("fs");

function readdir(path, options = {}) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, options, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function readFile(path, options = {}) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, options, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function isDirectory(path) {
  return fs.lstatSync(path).isDirectory(); // Sync version, can use async with Promise
}

async function findFiles(path, pattern = ".js") {
  let allFiles = (await readdir(path)).map(file => path + "/" + file);
  let matched = allFiles.filter(file => file.endsWith(pattern));
  let folders = allFiles.filter(file => isDirectory(file));

  for (let folder of folders) {
    let moreMatches = await findFiles(folder, pattern);
    matched = matched.concat(moreMatches);
  }
  return matched;
}

exports.readdir = readdir;
exports.readFile = readFile;
exports.isDirectory = isDirectory;
exports.findFiles = findFiles;
