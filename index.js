const Guard = {
    Against: {
        NullOrUndefined(input, parameterName = 'Value', message = `cannot be null or undefined.`) {
            if (input === null || input === undefined) {
                throw new Error(`${parameterName} ${message}`);
            }
        },

        Null(input, parameterName = 'Value', message = `cannot be null`) {
            if (input === null) {
                throw new Error(`${parameterName} ${message}`);
            }
        },

        NullOrEmpty(input, parameterName = 'Value') {
            this.Null(input, parameterName);
            if (input.length === 0) {
                throw new Error(`${parameterName} cannot be empty.`);
            }
        },

        NullOrWhiteSpace(input, parameterName = 'Value') {
            this.NullOrEmpty(input, parameterName);
            if (typeof input === 'string' && input.trim().length === 0) {
                throw new Error(`${parameterName} cannot be whitespace.`);
            }
        },

        OutOfRange(input, range, parameterName = 'Value') {
            this.Null(input, parameterName);
            const [min, max] = range;
            if (input < min || input > max) {
                throw new Error(`${parameterName} is out of range. Must be between ${min} and ${max}.`);
            }
        },

        Zero(input, parameterName = 'Value') {
            if (input === 0) {
                throw new Error(`${parameterName} cannot be zero.`);
            }
        },

        Expression(input, func, message, paramName = 'Value') {
            if (!func(input)) {
                throw new Error(`${message}. Parameter: ${paramName}`);
            }
            return input;
        },

        async ExpressionAsync(input, func, message, paramName = 'Value') {
            if (!await func(input)) {
                throw new Error(`${message}. Parameter: ${paramName}`);
            }
            return input;
        },

        EmptyObject(input, parameterName = 'Value') {
            if (Object.keys(input).length === 0) {
                throw new Error(`${parameterName} cannot be an empty object.`);
            }
        },

        UndefinedOrNullOrNaN(input, parameterName = 'Value') {
            if (input === undefined || input === null || Number.isNaN(input)) {
                throw new Error(`${parameterName} cannot be undefined, null, or NaN.`);
            }
        },

        Falsy(input, parameterName = 'Value') {
            if (!input) {
                throw new Error(`${parameterName} cannot be falsy.`);
            }
        },

        EmptyArray(input, parameterName = 'Value') {
            if (Array.isArray(input) && input.length === 0) {
                throw new Error(`${parameterName} cannot be an empty array.`);
            }
        },

        NotObject(input, parameterName = 'Value') {
            if (typeof input !== 'object' || input === null) {
                throw new TypeError(`${parameterName} must be an object.`);
            }
        },

        NegativeOrZero(input, parameterName = 'Value') {
            if (input <= 0) {
                throw new Error(`${parameterName} must be greater than zero.`);
            }
        }

    }
};

export default Guard;
