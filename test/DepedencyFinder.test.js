let DependencyFinder = require('../src/DependencyFinder');

describe('DependencyFinder', function() {
    it('exists', function() {
        expect(typeof DependencyFinder).not.toBe("undefined");
    });

    it('can be instantiated', function() {
        let df = new DependencyFinder();
        expect(typeof df).toBe("object");
    });

    describe('has a property `find`', function() {
        let df = new DependencyFinder();

        it('that is a function', function() {
            expect(typeof df.find).toBe('function');
        });

        it('returns a json object', function() {
            var result = df.find();
            expect(typeof result).toBe('object');
        });

    });
})
