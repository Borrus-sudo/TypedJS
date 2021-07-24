// import throwError from "./throwError";
export function useInt(value, options = {}) {
    if (!Number.isInteger(value))
        throw new TypeError(
            `TypeError: Value of type non integer cannot be assigned to type integer`
        );
    const dependencyTracker = new WeakMap();
    const payload = new Proxy(
        Object.defineProperties({}, {
            _value: {
                value,
                writable: true,
                configurable: false,
                enumerable: false,
            },
            [Symbol.toPrimitive]: {
                value: function() {
                    return this._value;
                },
                configurable: true,
                writable: true,
                enumerable: true,
            },
        }), {
            get(target, prop, receiver) {
                dependencyTracker.set(target, receiver);
                console.log({ prop });
                console.log(typeof target[prop]);
                if (typeof prop === "string")
                    if (prop.startsWith("_")) {
                        throw new Error("Access Error: Property not accessible");
                    }
                const caller = target[prop];
                if (typeof caller === "function") {
                    return caller.bind(target);
                }
                return Reflect.get(...arguments);
            },
            set(_target, _prop, val) {
                if (Number.isInteger(val)) {
                    return Reflect.set(...arguments);
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