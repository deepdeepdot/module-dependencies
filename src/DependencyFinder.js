const { findFiles, readFile } = require("./file-utils");

const indexStart = "require(".length + 1;

async function findModules({ source, content }) {
  let modules = content.match(/require\((.+)\)/g);
  let dependencies = modules
    ? modules.map(s => s.substring(indexStart, s.length - 2))
    : [];

  return {
    source,
    dependencies
  };
}

async function readFileWithSource(path) {
  let buffer = await readFile(path);
  return {
    source: path,
    content: buffer.toString()
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
