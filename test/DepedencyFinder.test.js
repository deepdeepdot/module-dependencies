let { DependencyFinder } = require("../src/DependencyFinder");

describe("DependencyFinder", function() {
  it("exists", function() {
    expect(typeof DependencyFinder).toBeDefined();
  });

  it("can be instantiated", function() {
    let df = new DependencyFinder();
    expect(typeof df).toBe("object");
  });

  describe("has a property `find`", function() {
    let df = new DependencyFinder();

    it("that is a function", function() {
      expect(typeof df.find).toBe("function");
    });

    it("throws an error if path is missing", async function() {
      try {
        var result = await df.find();
      } catch (e) {
        expect(e.message).toBe("DependencyFinder.find(path): Missing path!");
      }
    });

    describe("returns a result", function() {
      const path = "./node_modules/request";
      var result;

      beforeEach(async function(done) {
        try {
          result = await df.find(path);
          expect(typeof result).toBe("object");
          done();
        } catch (e) {}
      });

      it("is a json object", function() {
        try {
          expect(typeof result).toBe("object");
        } catch (e) {}
      });

      it("returns an array", function() {
        expect(Array.isArray(result)).toBeTruthy();
      });

      it("and the array contains some num of elements", function() {
        expect(result.length).toBe(13);
      });

      describe("and the first element", function() {
        it("is defined", function() {
          let firstElement = result[0];
          expect(firstElement).toBeDefined();
        });

        it("contains a property `source`", function() {
          let first = result[0];
          expect(typeof first.source).toBeDefined();
        });

        it("contains a property `dependencies`", function() {
          let firstElement = result[0];
          expect(typeof firstElement.dependencies).toBeDefined();
        });
      });
    });
  });
});
