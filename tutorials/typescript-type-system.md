## TypeScript's Type System

TypeScript's type system might seem simple at first, but it is capable of a
surprising amount of complexity. Supposedly, it is even
[Turing complete](https://github.com/microsoft/TypeScript/issues/14833)!

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
