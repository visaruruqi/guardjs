# GuardJs

GuardJs is a simple runtime validation library. It exposes a `Guard` object that helps enforce preconditions and validate inputs at runtime. By failing fast when values are missing, invalid or out of range, GuardJs helps you catch bugs early and write more maintainable code.

## Installation

```bash
npm install guardjs
```

## Usage

Import the library and call the guards to validate values coming into your code:

```javascript
import Guard from 'guardjs';

function createUser(username, age) {
    Guard.Against.NullOrWhiteSpace(username, 'username');
    Guard.Against.OutOfRange(age, [18, 99], 'age');
}
```

### Examples

Below are some examples demonstrating the available guards:

```javascript
function withdrawFunds(account, amount) {
    Guard.Against.Null(account, 'account');
    Guard.Against.NegativeOrZero(amount, 'amount');
    Guard.Against.Expression(
        account.balance,
        balance => balance >= amount,
        'Insufficient funds',
        'balance'
    );
}

async function registerUser(email) {
    Guard.Against.NullOrWhiteSpace(email, 'email');
    await Guard.Against.ExpressionAsync(
        email,
        async val => !(await isEmailTaken(val)),
        'Email is already taken',
        'email'
    );
}

function processItems(items) {
    Guard.Against.EmptyArray(items, 'items');
    items.forEach(item => {
        Guard.Against.UndefinedOrNullOrNaN(item.price, 'item.price');
    });
}

function updateSettings(settings) {
    Guard.Against.NotObject(settings, 'settings');
    Guard.Against.EmptyObject(settings, 'settings');
}

function bookFlight(user, destination, seats) {
    Guard.Against.Null(user, 'user');
    Guard.Against.NullOrWhiteSpace(destination, 'destination');
    Guard.Against.NegativeOrZero(seats, 'seats');
}

function sendNotification(userId) {
    Guard.Against.Falsy(userId, 'userId');
}
```

Use GuardJs at every trust boundary—any place you receive data from outside your immediate logic.

### Chaining Guards

Every guard now returns the validated value, enabling simple chaining:

```javascript
const username = Guard.Against
    .NullOrWhiteSpace(inputUsername, 'username')
    .toLowerCase();

const age = Guard.Against
    .OutOfRange(inputAge, [18, 99], 'age');
```

### Running Tests

This repository uses [Vitest](https://vitest.dev) for the test suite:

```bash
npm test
```
