const fs = require("fs");

exports.readdir = function(path, options) {
  options = options || {};
  return new Promise(function(resolve, reject) {
    fs.readdir(path, options, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

exports.readFile = function(path, options) {
  options = options || {};
  return new Promise(function(resolve, reject) {
    fs.readFile(path, options, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
