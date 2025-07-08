const Guard = {
    Against: {
        NullOrUndefined(input, parameterName = 'Value', message = `cannot be null or undefined.`) {
            if (input === null || input === undefined) {
                throw new Error(`${parameterName} ${message}`);
            }
            return input;
        },

        Null(input, parameterName = 'Value', message = `cannot be null`) {
            if (input === null) {
                throw new Error(`${parameterName} ${message}`);
            }
            return input;
        },

        NullOrEmpty(input, parameterName = 'Value') {
            this.Null(input, parameterName);
            if (input.length === 0) {
                throw new Error(`${parameterName} cannot be empty.`);
            }
            return input;
        },

        NullOrWhiteSpace(input, parameterName = 'Value') {
            this.NullOrEmpty(input, parameterName);
            if (typeof input === 'string' && input.trim().length === 0) {
                throw new Error(`${parameterName} cannot be whitespace.`);
            }
            return input;
        },

        OutOfRange(input, range, parameterName = 'Value') {
            this.Null(input, parameterName);
            const [min, max] = range;
            if (input < min || input > max) {
                throw new Error(`${parameterName} is out of range. Must be between ${min} and ${max}.`);
            }
            return input;
        },

        Zero(input, parameterName = 'Value') {
            if (input === 0) {
                throw new Error(`${parameterName} cannot be zero.`);
            }
            return input;
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
            return input;
        },

        UndefinedOrNullOrNaN(input, parameterName = 'Value') {
            if (input === undefined || input === null || Number.isNaN(input)) {
                throw new Error(`${parameterName} cannot be undefined, null, or NaN.`);
            }
            return input;
        },

        Falsy(input, parameterName = 'Value') {
            if (!input) {
                throw new Error(`${parameterName} cannot be falsy.`);
            }
            return input;
        },

        EmptyArray(input, parameterName = 'Value') {
            if (Array.isArray(input) && input.length === 0) {
                throw new Error(`${parameterName} cannot be an empty array.`);
            }
            return input;
        },

        NotObject(input, parameterName = 'Value') {
            if (typeof input !== 'object' || input === null) {
                throw new TypeError(`${parameterName} must be an object.`);
            }
            return input;
        },

        NegativeOrZero(input, parameterName = 'Value') {
            if (input <= 0) {
                throw new Error(`${parameterName} must be greater than zero.`);
            }
            return input;
        }

    }
};

export default Guard;
