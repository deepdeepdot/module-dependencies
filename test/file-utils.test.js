const fs = require("fs");

const { readdir, readFile } = require("../src/file-utils.js");

describe("file-utils", function() {
  describe("readdir", function() {
    let path = "./node_modules/request";

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
});
