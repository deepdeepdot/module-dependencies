const fs = require("fs");

const { readdir, readFile, findFiles } = require("./file-system");

// const path = ".";
const path = "./node_modules/request";
// const path = "./test/fixtures/empty";

if (1) {
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

    for (let file of resp) {
      console.log(file.name, "folder?", file.isDirectory());
    }
  });
}

console.log("---------- Part 2 -------");

let asyncRead = async function() {
  let files = await readdir(path);
  console.log("++++", files);
};

let asyncReadWithTypes = async function() {
  let files = await readdir(path, { withFileTypes: true });
  console.log("===", files);
};

let findRecursive = async function() {
  let files = await findFiles(path);
  console.log(files);
};

asyncRead();
asyncReadWithTypes();
findRecursive();
