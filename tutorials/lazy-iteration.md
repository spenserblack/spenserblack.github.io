---
title: Lazy Iteration
tags:
  - python
---

## Lazy Iterators / Generators

To be honest, it's frustrating that more people aren't familiar with this
concept. Many times I see entirely new arrays/slices/lists/etc. defined just
to contain calculated values that aren't reused. This takes up more memory than
necessary. There's a better way!

```javascript
// JavaScript is a good example of creating new values that are NOT lazy
// iterators. filter, map, etc. create new arrays!
const numbers = [1, 2, 3, 4, 5];
const oddsDoubled = numbers
  .filter((n) => n % 2 !== 0)
  .map((n) => n * 2);
```

One way, obviously, is to simply not declare a new value, and instead do the
calculations in a loop. It's so obvious it probably doesn't need an example,
but here is one anyway.

```javascript
// This is a really easy and obvious way.
const oddsDoubled = [];
for (let i = 0; i <= numbers.length; i++) {
  const n = numbers[i];
  if (n % 2 !== 0) {
    oddsDoubled.push(n * 2);
  }
}
```

```javascript
// The other obvious way.
const oddsDoubled = [];
numbers.forEach((n) => {
  if (n % 2 !== 0) {
    oddsDoubled.push(n * 2);
  }
});
```

But, the more complex your filtering, mapping or whatever other calculation you
make gets, the bigger the loop gets, and this can make it hard to read.

Here's an example of lazy iteration in Python (they're called generators in
Python). Python makes lazy iteration very easy. Even `range` itself creates a
lazy iterator!

```python
numbers = range(1, 6) # lazy iterator
odds = filter(lambda n: n % 2 != 0, numbers) # Still lazy
odds_doubled = map(lambda n: n * 2, odds) # Yes, it's lazy
print(list(odds_doubled)) # [2, 6, 10]
```

You don't need to memorize these function names, though, because Python has an
easy syntax for making any lazy iterator.

```python
numbers = range(1, 6)
# It's just like any other comprehension, only using () instead of [], {}, etc.
odds_doubled = (n * 2 for n in numbers if n % 2 != 0)
print(list(odds_doubled)) # [2, 6, 10]
```

You can make more complex generators with the `yield` keyword.

```python
# There are plenty of other ways to do a fizzbuzz, but this is good for
# explaining generators.
def fizzbuzz(start, stop):
    for n in range(start, stop + 1):
        if n % 15 == 0:
            yield 'fizzbuzz'
        elif n % 5 == 0:
            yield 'buzz'
        elif n % 3 == 0:
            yield 'fizz'
        else:
            yield n

for x in fizzbuzz(1, 15):
    print(x)
# 1
# 2
# fizz
# 4
# buzz
# fizz
# 7
# 8
# fizz
# buzz
# 11
# fizz
# 13
# 14
# fizzbuzz
```

Lazy iterators are also easy to do in Rust.

```rust
// The range {start..end}, filter, and map are all lazy iterators
let numbers_doubled: Vec<u8> = {1..=5}
    .filter(|n| n % 2 != 0)
    .map(|n| n * 2)
    .collect();
println!("{:?}", numbers_doubled); // [2, 6, 10]
```

So, how would you use lazy iterators in JavaScript? JavaScript now provides
the ability to define generators, too!

```javascript
// The * makes it a generator.

// Lazy generator of numbers
function* range(start, stop) {
  for (let i = start; i <= stop; i++) {
    yield i;
  }
}

function* filter(f, iter) {
  for (const v of iter) {
      if (f(v)) {
        yield v;
      }
  }
}

function* map(f, iter) {
  for (const v of iter) {
    yield f(v);
  }
}

const numbers = range(1, 5);
const odds = filter((n) => n % 2 !== 0, numbers);
const oddsDoubled = map((n) => n * 2, odds);
console.log(Array.from(oddsDoubled)); // [2, 6, 10]
```
