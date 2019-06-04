const fs = require("fs");
const { findFiles } = require("file-system");

async function processFile(file) {}

// First version: disliked very much, probably buggy too
async function traverseFiles(path, currentPath = []) {
  let result = [];

  let files = await readdir(currentPath.join("/") + path, {
    withFileType: true
  });
  for (let file of files) {
    if (file.isDirectory()) {
      // to optimize, start processing files before traversing next!
      currentPath.push(file.name);
      result = result.concat(await traverseFiles(file.name, currentPath));
      currentPath.pop();
    } else {
      result.push(await processFile(file));
    }
  }
  return result;
}

/**
 * Given the source code as a string,
 * Return the dependencies as an array
 * @param {source} str The path to the source file
 * @returns {source, dependencies}
 */
function findModules({ source, content }) {
  let dependencies = [];
  return {
    source,
    dependencies
  };
}

class DependencyFinder {
  /**
   * Given the source code as a string,
   * Return the dependencies as an array
   * @param {path} str The root path to the source files.
   * @returns {array} The names of all the dependencies
   */
  async find(path) {
    let paths = await findFiles(path);
    // readFile -> { source: "", content: "" }
    // findModules -> { source: "", modules: [] }
    let result = await Promise.all(paths.map(readFile).map(findModules));

    // Convert this flat representation into a json hierarchy?
    return result;
  }
}

module.exports = DependencyFinder;
