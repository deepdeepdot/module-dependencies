const fs = require("fs");

const { readdir, readFile, findFiles } = require("./file-utils");
const { DependencyFinder } = require("./DependencyFinder");

const testBasicNodeAPIs = false;
const testAsyncAPIs = false;
const testDependencyFinder = true;

// const path = ".";
const path = "./node_modules/request";
// const path = "./test/fixtures/empty";

if (testBasicNodeAPIs) {
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

let readFileAsync = async function() {
  let path = "./node_modules/request";
  let file = `${path}/lib/auth.js`;
  let content = await readFile(file);
  console.log("---");
  console.log(content.toString().substr(0, 100));
  console.log("---");
};

function runAsyncAPIs() {
  asyncRead();
  asyncReadWithTypes();
  findRecursive();
  readFileAsync();
}

if (testAsyncAPIs) {
  runAsyncAPIs();
}

async function runDependencyManager() {
  let df = new DependencyFinder();
  let result = await df.find(path);
  console.log(result);
}

if (testDependencyFinder) {
  runDependencyManager();
}
