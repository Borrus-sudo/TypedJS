import throwError from "./throwError";
export function useInt(value, options = {}) {
    let evalFunc = typeof value === "function" ? value : () => value;
    if (!Number.isInteger(evalFunc())) throwError("IntTypeError");
    const payload = new Proxy(
        Object.defineProperties({}, {
            value: {
                get() {
                    return evalFunc();
                },
                set() {},
                configurable: false,
                enumerable: false,
            },
            valueOf: {
                value() {
                    return evalFunc();
                },
                writable: true,
                configurable: false,
                enumerable: false,
            },
        }), {
            get(target, prop, _receiver) {
                const caller = target[prop];
                return typeof caller === "function" ?
                    caller.bind(target) :
                    Reflect.get(...arguments);
            },
            set(_target, _prop, val) {
                evalFunc = typeof val === "function" ? val : () => val;
                if (Number.isInteger(evalFunc())) return true;
                else throwError("IntTypeError");
            },
        }
    );
    Object.preventExtensions(payload);
    if (options["readonly"] === true) {
        Object.freeze(payload);
    }
    return payload;
}