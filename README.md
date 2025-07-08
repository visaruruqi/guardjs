# BreakerJs

BreakerJs is a simple runtime validation library. It exposes a `Guard` object that helps enforce preconditions and validate inputs at runtime. By failing fast when values are missing, invalid or out of range, BreakerJs helps you catch bugs early and write more maintainable code. Use Guard at every trust boundary, any place you receive data from outside your immediate logic. Treat it as a non-negotiable habit. You’ll save yourself from subtle bugs, wasted time, and “how did this even happen?” moments. Guard everything. Fail fast. Move faster.

BreakerJs is distributed as an **ECMAScript module** (`type: "module"` in `package.json`). Ensure your environment supports ESM and import the library using standard `import` syntax.

## Installation

```bash
npm install breakerjs
```

## Usage

Import the library and call the guards to validate values coming into your code:

```javascript
import Guard from 'breakerjs';

function createUser(username, age) {
    Guard.Against.NullOrWhiteSpace(username, 'username');
    Guard.Against.OutOfRange(age, [18, 99], 'age');
    // Proceed to create user
}
```

### Examples

1. **Validate Required Function Arguments**

```javascript
function createUser(username, age) {
    Guard.Against.NullOrWhiteSpace(username, 'username');
    Guard.Against.OutOfRange(age, [18, 99], 'age');
    // Proceed to create user
}
```
If `username` is missing or just spaces, or `age` is out of bounds, it fails fast.

2. **API Input Validation**

```javascript
app.post('/orders', (req, res) => {
    try {
        Guard.Against.NotObject(req.body, 'request body');
        Guard.Against.NullOrEmpty(req.body.productId, 'productId');
        Guard.Against.NegativeOrZero(req.body.quantity, 'quantity');
        // Continue with order creation
        res.status(201).send('Order placed');
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});
```
This blocks invalid requests before they touch your business logic.

3. **Enforcing Business Rules**

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
    // Deduct funds
}
```
No more negative withdrawals or overdrawn accounts sneaking through.

4. **Async Checks (e.g., Unique Email Validation)**

```javascript
async function registerUser(email) {
    Guard.Against.NullOrWhiteSpace(email, 'email');
    await Guard.Against.ExpressionAsync(
        email,
        async (val) => !(await isEmailTaken(val)),
        'Email is already taken',
        'email'
    );
    // Proceed with registration
}
```
Validation that relies on an async database call.

5. **Array and Object Checks**

```javascript
function processItems(items) {
    Guard.Against.EmptyArray(items, 'items');
    items.forEach(item => {
        Guard.Against.UndefinedOrNullOrNaN(item.price, 'item.price');
    });
    // Continue with processing
}
```

6. **Reusable Checks at Boundaries**

```javascript
function updateSettings(settings) {
    Guard.Against.NotObject(settings, 'settings');
    Guard.Against.EmptyObject(settings, 'settings');
    // Continue to update
}
```

7. **Chaining Multiple Guards**

```javascript
function bookFlight(user, destination, seats) {
    Guard.Against.Null(user, 'user');
    Guard.Against.NullOrWhiteSpace(destination, 'destination');
    Guard.Against.NegativeOrZero(seats, 'seats');
    // Proceed to booking
}
```

8. **Guard Against Falsy Values**

```javascript
function sendNotification(userId) {
    Guard.Against.Falsy(userId, 'userId');
    // Proceed with sending notification
}
```
Catches null, undefined, 0, false, '', or NaN.

Use BreakerJs at every trust boundary—any place you receive data from outside your immediate logic.

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
