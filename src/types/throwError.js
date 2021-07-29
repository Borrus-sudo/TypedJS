export default function(errorType) {
    switch (errorType) {
        case "IntTypeError":
            throw new TypeError(
                "TypeError: Value of type non integer cannot be assigned to type integer"
            );

        default:
            break;
    }
}