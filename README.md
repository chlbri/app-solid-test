# @bemedev/app-solid-test

A comprehensive testing library for `@bemedev/app-solid` state machines and
interpreters.

<br/>

## Features

- 🧪 Test state machine interpreters with Vitest
- 🔄 Test state transitions, context changes, and UI thread updates
- ⏱️ Built-in fake timer support (`createFakeWaiter`)
- 🎯 Convenient test helpers (`testBy`, `matches`, `contains`, `hasTags`)
- 🚀 Easy assertion helpers for values, context, and UI state
- 📊 Full support for parallel states and hierarchical state machines

<br/>

## Installation

```bash
pnpm add -D @bemedev/app-solid-test
```

<br/>

## Usage

### Basic Example

```typescript
import { createInterpreter } from '@bemedev/app-solid';
import { createTests } from '@bemedev/app-solid-test';

vi.useFakeTimers();

describe('My state machine', () => {
  const interpreter = createInterpreter({
    machine: myMachine,
    options: {
      context: { count: 0 },
    },
  });

  const inter = createTests(vi, interpreter);
  const testValue = inter.testBy(({ value }) => value());
  const testCount = inter.testBy(({ context }) => context(s => s.count));

  it(...inter.start);
  it(...testValue('Initial state', 'idle'));
  it(...testCount('Initial count', 0));
  it(...inter.send('INCREMENT'));
  it(...testCount('Count incremented', 1));
  it(...inter.stop);
});
```

### API Reference

#### `createTests(vi, interpreter)`

Creates a test wrapper for an interpreter with helpful testing methods.

**Parameters:**

- `vi`: Vitest utilities instance
- `interpreter`: The interpreter instance to test

**Returns:** `InterpreterTest` instance with the following methods:

#### Test Methods

- **`testBy(fn)`** - Create a custom test function

  ```typescript
  const testValue = inter.testBy(({ value }) => value());
  const testContext = inter.testBy(({ context }) => context(s => s.data));
  ```

- **`matches(...values)`** - Assert exact state match

  ```typescript
  it(...inter.matches('idle', 'active'));
  ```

- **`contains(...values)`** - Assert state contains values

  ```typescript
  it(...inter.contains('working', 'active'));
  ```

- **`hasTags(...tags)`** - Assert state has specific tags
  ```typescript
  it(...inter.hasTags('loading', 'visible'));
  ```

#### Control Methods

- **`start`** - Start the interpreter
- **`stop`** - Stop the interpreter
- **`pause`** - Pause the interpreter
- **`resume`** - Resume the interpreter
- **`send(event)`** - Send an event
- **`sendUI(event)`** - Send a UI event
- **`dispose`** - Dispose the interpreter

#### Timer Helper

- **`createFakeWaiter`** - Create a fake timer waiter
  ```typescript
  const wait = inter.createFakeWaiter.withDefaultDelay(1000);
  it(...wait()); // Wait 1000ms
  it(...wait(2)); // Wait 2000ms (2 × 1000ms)
  ```

### Testing UI Thread

```typescript
const interpreter = createInterpreter({
  machine: myMachine,
  options: { context: { count: 0 } },
  uiThread: { counter: 10 },
});

const inter = createTests(vi, interpreter);
const counterUI = inter.testBy(({ ui }) => ui(s => s?.counter));

it(...inter.start);
it(...counterUI('Initial UI counter', 10));
it(...inter.sendUI({ type: 'UPDATE', payload: 42 }));
it(...counterUI('Updated UI counter', 42));
```

<br/>

## Licence

MIT

## CHANGE_LOG

<details>

<summary>
...
</summary>

## **[0.2.1] - 2025/11/29** => _17:30_

- Add peer dependencies for better compatibility
- Enhance package configuration

### Version [0.0.1] --> _date & hour_

- ✨ Première version de la bibliothèque

</details>

<br/>

## Auteur

chlbri (bri_lvi@icloud.com)

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

<br/>

## Liens

- [Documentation](https://github.com/chlbri/new-package)
