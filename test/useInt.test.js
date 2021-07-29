import { useInt } from "../src/index.js";

describe("My useInt function", () => {
    it("should throw a TypeError", () => {
        try {
            useInt(1.0);
            const num2 = useInt(1);
            num2.value = 1.0;
        } catch (error) {
            expect(error.messaeg).toBe(
                "TypeError: Value of type non integer cannot be assigned to type integer"
            );
        }
    });
    it("should successfully return value via toString", () => {
        const num1 = useInt(1);
        const num2 = useInt(2);
        expect(2 + num1 + num2 + 2).toBe(7);
    });
    it("should run successfully with a function returning an int value instead", () => {
        const num1 = useInt(() => 5);
        const num2 = useInt(() => 1);
        const num3 = useInt(12);
        num3.value = () => 1;
        expect(num1.value).toBe(5);
        expect(num2.value).toBe(1);
        expect(num3.value).toBe(1);
    });
    it("should throw a TypeError with a function returning a non int value instead", () => {
        try {
            useInt(() => 0.1);
            const num2 = useInt(1);
            num2.value = () => 1.0;
        } catch (error) {
            expect(error.message).toBe(
                "TypeError: Value of type non integer cannot be assigned to type integer"
            );
        }
    });
});