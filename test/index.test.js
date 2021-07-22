import { useInt } from "../src/index.js";
console.log(useInt);
describe("My useInt function", () => {
    it("should run correctly", () => {
        expect(useInt(10)).toBe(10);
    });
    it("should run correctly", () => {
        expect(useInt(11)).toBe(11);
    });
});