// import throwError from "./throwError";
export function useInt(value, options = {}) {
    if (!Number.isInteger(value) ||
        (typeof value === "function" && !Number.isInteger(value()))
    )
        throw new TypeError(
            `TypeError: Value of type non integer cannot be assigned to type integer`
        );

    const evalFunc = typeof value === "function" ? value : () => value;
    const payload = new Proxy(
        Object.defineProperties({}, {
            value: {
                get value() {
                    return this._eval();
                },
                writable: true,
                configurable: false,
                enumerable: false,
            },
            _eval: {
                value: evalFunc,
                writable: true,
                configurable: false,
                enumerable: false,
            },
        }), {
            get(target, prop, _receiver) {
                console.log({ prop });
                console.log(typeof target[prop]);
                if (typeof prop === "string")
                    if (prop.startsWith("_")) {
                        throw new Error("Access Error: Property not accessible");
                    }
                const caller = target[prop];

                return typeof caller === "function" ?
                    caller.bind(target) :
                    Reflect.get(...arguments);
            },
            set(_target, _prop, val) {
                if (
                    Number.isInteger(val) ||
                    (typeof val === "function" && Number.isInteger(val()))
                ) {
                    const newVal = typeof val === "function" ? val : () => val;
                    return Reflect.set(_target, "evalFunc", newVal);
                } else {
                    throw new TypeError(
                        `TypeError: Value of type non integer cannot be assigned to type integer`
                    );
                }
            },
        }
    );
    Object.preventExtensions(payload);
    if (options["readonly"] === true) {
        Object.freeze(payload);
    }
    return payload;
}