const fs = require("fs");

const { readdir, readFile } = require("../src/file-utils.js");

describe("file-utils", function() {
  let path = "./node_modules/request";

  describe("readdir", function() {
    it("returns the same files as the Node JS API `readdir`", async function(done) {
      let files = await readdir(path);
      fs.readdir("./node_modules/request", function(err, result) {
        if (err) throw err;
        expect(files).toEqual(result);
        done();
      });
    });

    it("returns the same files as the Node JS API `readdir` with withFileTypes", async function(done) {
      let options = { withFileTypes: true };
      let files = await readdir(path, options);

      fs.readdir("./node_modules/request", options, function(err, result) {
        if (err) throw err;
        expect(files).toEqual(result);
        done();
      });
    });

    it("throws the same error as in the Node JS API `readdir` with withFileTypes", async function(done) {
      const nonExistantPath = "./adfdffdaffad";
      let error;
      try {
        let files = await readdir(nonExistantPath);
      } catch (e) {
        error = e;
      }
      fs.readdir(nonExistantPath, function(err, result) {
        expect(err).toEqual(error);
        done();
      });
    });
  });

  describe("readFile", function() {
    it("returns the same content as the Node JS API `readFile`", async function(done) {
      let file = "./node_modules/request/lib/auth.js";
      let buffer = await readFile(file);
      let content = buffer.toString();

      fs.readFile(file, function(err, result) {
        if (err) throw err;
        expect(content).toEqual(result.toString());
        done();
      });
    });

    it("throws the same error as in the Node JS API `readFile` for a non-existant file", async function(done) {
      const nonExistantPath = "./adfdffdaffad";
      let error;
      try {
        let files = await readFile(nonExistantPath);
      } catch (e) {
        error = e;
      }
      fs.readFile(nonExistantPath, function(err, result) {
        expect(err).toEqual(error);
        done();
      });
    });

    it("throws the same error as in the Node JS API `readFile` for a directory file", async function(done) {
      let folder = "./node_modules/request/";
      let error;
      try {
        let buffer = await readFile(folder);
      } catch (e) {
        error = e;
      }
      fs.readFile(folder, function(err, result) {
        expect(err).toEqual(error);
        done();
      });
    });
  });
});
