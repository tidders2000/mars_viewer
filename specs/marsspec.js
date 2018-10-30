describe("mars-app", function() {
    describe("manifest function", function() {
        it("should return data"), function() {
             expect(manifest(data)).toEqual('object');   
        };
        it("should append manifest data to div"), function() {
                expect('#info').not.toBeEmpty()
        }
        it("should write intructions to div"), function() {
                expect('#instructions').not.toBeEmpty()
        }
    });
});
