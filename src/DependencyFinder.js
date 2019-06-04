const { findFiles, readFile } = require("./file-utils");

async function findModules({ source, content }) {
  let dependencies = [];

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
    let result = await Promise.all(
      paths.map(readFileWithSource).map(findModules)
    );
    return result;
  }
}

module.exports = DependencyFinder;
