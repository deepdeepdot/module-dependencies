const fs = require("fs");

const { readdir, readFile } = require("./file-system");

const path = ".";

fs.readdir(path, function(err, resp) {
  if (err) throw err;
  console.log(resp);
});

fs.readdir(path, { withFileTypes: true }, function(err, resp) {
  if (err) throw err;
  console.log(resp);
});

fs.readdir(path, { withFileTypes: true }, function(err, resp) {
  if (err) throw err;

  if (resp && Array.isArray(resp)) {
    for (let file of resp) {
      console.log(file.name, "folder?", file.isDirectory());
    }
  }
});

console.log("---------- Part 2 -------");

let asyncRead = async function() {
  let files = await readdir(path);
  console.log("++++", files);
};

asyncRead();
