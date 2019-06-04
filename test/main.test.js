let { DependencyFinder } = require("../src/DependencyFinder");
let requestDependencies = require("./fixtures/request-dependencies.json");

describe("main", function() {
  it("matches for an empty folder", async function(done) {
    try {
      const path = "./test/fixtures/empty";
      let df = new DependencyFinder();
      let map = await df.find(path);
      expect(map).toEqual([]);
      done();
    } catch (e) {}
  });

  it("matches for the request library", async function(done) {
    try {
      const path = "./node_modules/request";
      let df = new DependencyFinder();
      let map = await df.find(path);
      expect(map).toEqual(requestDependencies);
      done();
    } catch (e) {}
  });
});
