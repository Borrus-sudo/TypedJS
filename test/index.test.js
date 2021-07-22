import { useInt } from "../src/index.js";
console.log(useInt);
describe("My useInt function", () => {
    it("has to have name set to Jinmay", () => {
        expect(useInt(10)).toBe(10);
    });
    it("has to have surname set to Jhaveri", () => {
        expect(useInt(11)).toBe(11);
    });
});