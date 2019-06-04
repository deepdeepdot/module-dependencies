const { findFiles, readFile } = require("./file-utils");

async function findModules({ source, content }) {
  let dependencies = [];
  dependencies.push("dummy-dep");

  return {
    source,
    dependencies
  };
}

async function readFileWithSource(path) {
  let content = await readFile(path);
  return {
    source: path,
    content
  };
}

class DependencyFinder {
  /**
   * Given the path as a string,
   * Return the dependencies as an array
   * @param {path} str The root path to the source files.
   * @returns {array} The dependencies for each source file
   */
  async find(path) {
    if (!path) {
      throw new Error("DependencyFinder.find(path): Missing path!");
    }
    let paths = await findFiles(path);
    let contents = await Promise.all(paths.map(readFileWithSource));
    let result = await Promise.all(contents.map(findModules));
    return result;
  }
}

exports.DependencyFinder = DependencyFinder;
exports.readFileWithSource = readFileWithSource;
exports.findModules = findModules;
