// import throwError from "./throwError";
export function useInt(value, options) {
    const returnValue = {};
    if (Number.isInteger(value)) {
        returnValue._value = value;
    }
    const handler = {
        get(val, prop, receiver) {},
        set() {},
    };
    const proxy = new Proxy(returnValue, handler);
    return value;
}