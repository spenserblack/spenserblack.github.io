## TypeScript's Type System

TypeScript's type system might seem simple at first, but it is capable of a
surprising amount of complexity. [Games have been written in the type sytem][TypeGame].
Supposedly, it is even [Turing complete](https://github.com/microsoft/TypeScript/issues/14833)!

This tutorial contains a few interesting examples to help you learn what
you can do with the type system.

### Boolean Logic

With [conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
it is possible to implement some basic control flow. In this example, we'll implement if-else
with types.

#### Setup and Branching Logic

First, let's create our own `True` and `False` types by aliasing the builtin primitive
values `true` and `false`.

```typescript
type True = true;
type False = false;
type Bool = True | False;
```

Now, let's also create `Not`, `And`, and `Or`.

```typescript
type And<L extends Bool, R extends Bool> = L extends True ? R : L;
type Or<L extends Bool, R extends Bool> = L extends True ? L : R;
type Not<B extends Bool> = B extends True ? False : True;
```

In either an editor that can parse TypeScript types, or the
[TypeScript Playground](https://www.typescriptlang.org/play), paste the
code above and this following code.
```typescript
type AndIsTrue = And<True, Not<False>>;
type AndIsFalse = And<False, True>;
type OrIsTrue = Or<Not<True>, True>;
type OrIsFAlse = Or<False, Not<True>>;
```

The detected types of `AndIsTrue` and `OrIsTrue` should be `true`, while
`AndIsFalse` and `OrIsFalse` should be `false`.

#### If-Else

Let's implement if-else now!

```typescript
type IfElse<B extends Bool, If, Else> = B extends True ? If : Else;
```

And let's try it out!

```typescript
// The detected type should be "it works!"
type ItWorks = IfElse<True, 'it works!', "it doesn't work...">;

// The detected type should be "ok!"
type SomethingMoreComplex = IfElse<Or<True, False>, IfElse<Not<And<True, Not<True>>>, 'ok!', undefined>, null>;
```

### Linked List

Here's something fun: finding the last element of a linked list as a type.

#### Setup

```typescript
interface LinkedList {
    value: any;
    next: LinkedList | null;
}
```

#### Getting The Last Value

```typescript
type LastValue<L extends LinkedList> = L['next'] extends null ? L['value'] : LastValue<NonNullable<L['next']>>;
```

Let's try it out!

```typescript
type LastValue1 = LastValue<{ value: 1, next: null }>;
type LastValue2 = LastValue<{ value: 1, next: { value: 2, next: null } }>;
type LastValue3 = LastValue<{ value: 1, next: { value: 2, next: { value: 3, next: null } } }>;
```

### Array Manipulation

#### Reversing An Array Type

In this example, we will create a type that represents a reversed array.
```typescript
type Reverse<T extends Array<unknown>> = 0 extends keyof T ?  (T extends [infer First, ...infer Remainder] ? [...Reverse<Remainder>, First] : T) : []
```

This is basically saying that, if `0` is in the array, then we know the array's length is >= `1`.
We use `[infer First, ...infer Remainder]` to "split" the array `T`. Here we're checking that `T`
can be represented by an array with 1 value, and then 0 or more remaining values. The `infer` allows
us to create new type variables *inside* the type definition. Otherwise, we might have needed a type
signature like `Reverse<T extends Array<unknown>, First extends unknown, Remainder extends Array<unknown>>`,
which would have been much more cumbersome. We put the first value at the end, and reverse the rest of the
values recursively. If, for some reason, our array `T` cannot be represented as `[First, ...Remainder]`,
then we just return the unreversed array. Finally, if `0` is not a key of the array `T`, we assume `T`
to be an empty array and return it. Note that at runtime this is not always true: here is a simple
example where `0` would not be a key in an array a length >= `1`.

```javascript
const arr = [1, 2, 3];
delete arr[0];
console.log(arr); // [empty, 2, 3]
console.log(0 in arr); // false
console.log(1 in arr); // true
```

Anyway, let's see our `Reverse` type in action!

```typescript
type Test = Reverse<['one', 2, { value: 3 }]>;
```

The type of `Test` should be `[{ value: 3 }, 2, "one"]`.

Note that `Reverse` will only work with arrays known at compile-time. If the
array mutates at runtime, then the type of `Reverse` would "return" `unknown[]`.

[TypeGame]: https://github.com/fc01/TypeGame
