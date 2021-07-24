import { useInt } from "../src/index.js";

describe("My useInt function", () => {
    it("should pass", () => {
        const num1 = useInt(1);
        const num2 = useInt(2);
        console.log(2 + num1 + num2 + 2);
        expect(2 + num1 + num2 + 2).toBe(7);
    });
});