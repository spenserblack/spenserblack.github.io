---
title: Comparison of programming languages
tags:
  - development
  - programming-languages
layout: ../../../layouts/MarkdownPost.astro
---

These are some thoughts I've had about the programming languages I've used. There isn't a particular
point to this writing, other than to finally get these ideas I've had in my head out and in a
document. Expect some unstructured rambling, reader.

What programming language is the best? I don't think there is a singular best programming language.
Instead, you should pick the language that best suits your needs given the project's criteria:

- Who are your users? If your target audience is developers, it may be fine to use a
  [scripting language](https://en.wikipedia.org/wiki/Scripting_language) and distribute via a package manager. But some users just want to be given
  a `.exe`, in which case a [compiled language](https://en.wikipedia.org/wiki/Compiled_language) would be best.
- What are you trying to accomplish?
  - Does the language have features that work well with your goal?
  - Does the language have tools and libraries available to you to help you achieve your goal?
- Who do you want to contribute to your project? If you want many contributors, you might want
  to pick a popular language.
- How will the project be used? If you want to be able to run it in a web browser, you probably
  want to pick JavaScript, or a language in the JavaScript ecosystem.

I've played around with a few programming languages, learning the basics of those I get curious
about. In my opinion, learning a programming language itself is not difficult, but learning the
_concepts_ of the language is the challenge. Thankfully, many programming languages share the
same concepts, so once you get familiar with one programming language, you have a head start
on learning some others.

I don't advertise myself as an expert of all of these languages. For some of the languages listed,
I would not call myself anything but a beginner, but I will write down these thoughts and
comparisons regardless.

## C

I've only made a few trivial CLI applications with C. What I find enjoyable is that, compared
to the other programming languages I've used, C naturally gives me a good idea of what the
assembly will actually look like. Rather than elaborate on this, I'll rely on the words of Linus
Torvalds in this video: https://www.youtube.com/watch?v=RQ1IfKUD1nw

## Gleam

Another language that, presently, I've only made a few trivial utilities with. But, from my limited
experience, I've found it to be quite a fun language, with an interesting syntax. Some notable
things about Gleam:

- It is an immutable language, meaning you cannot change the value of a variable.
- There are no `if` statements, relying instead on `case` statements.
- Rather than loops (`for` or `while`), you instead use recursion.

For example, if you were to write this in TypeScript:

```typescript
function checkNumber(n: number): string {
  if (n % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
}

for (const n of [1, 2, 3]) {
  console.log(checkNumber(n));
}
```

You might write it this way in Gleam:

```gleam
import gleam/io

pub fn main() {
  check_loop([1, 2, 3])
}

fn check_number(n: Int) -> String {
  case n % 2 == 0 {
    True -> "even"
    False -> "odd"
  }
}

fn check_loop(numbers: List(Int)) -> Nil {
  case numbers {
    [] -> Nil
    [head, ..tail] -> {
      check_number(head) |> io.println()
      check_loop(tail)
    }
  }
}
```

## Go

Go is pretty easy to learn. It has decent official online documentation to introduce you to the
language, and the syntax is simple. It's a [garbage collected](<https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)>)
language, but you still have explicit pass-by-pointer and pass-by-value, so it helps a learner get used
to the concept of pointers, without having to stress about memory management.

What I like most about Go is probably its very simple cross-compilation. Just set `GOOS`
to the operating system and `GOARCH` to the architecture you want to compile for. For this reason,
I usually consider writing compiled CLIs in Go. What's also appealing to me is its standard library,
which is full of utilities for things like image processing, HTTP, and more. Publishing a Go module
is also simple, because you _don't_ log in and publish to a package manager; instead, you just host the module on GitHub
or on your site.

Go is evolving and improving, so, while I might have been disappointed in the past about a lack of
features (like generics), I don't think it's worth complaining about that, because those wanted
features either have been added or could be added.

### Complaints

#### Easy types over accurate types

I'm not a fan of the standard of using the "easiest" integer type instead of the most accurate integer type. For
example, if you look at [the `Color` interface](https://pkg.go.dev/image/color#Color), you'll see
that the type for the return values of `RGBA()` is `uint32`. At first glance, you might assume that
they're actually 32-bit numbers, right? But really they're 16-bit numbers _stored_ in 32-bit values;
the values should never be greater than `0xFFFF`. Why do this? To avoid overflow if you multiply by
a blend factor up to `0xFFFF`. But if you didn't look at the documentation, but just the return
type, you might assume that the maximum value is a 32-bit number, `0xFFFFFFFF`. That's just an
example that bugged me a bit, but a more common example is that the index of arrays and slices is
the signed integer type `int`, despite the fact that an index should obviously never be negative. I
just think it's better for the type to clearly indicate the possible values, rather than be the
"easiest" type to use. I'd rather be trusted to know to convert to a signed or larger integer type
if I need to.

#### Implicit interface implementations

In some languages with interfaces, you either can or must declare that a type implements an
interface. In Go, an interface is implemented as long as it implements all methods correctly. For
example:

```go
package main

import "fmt"

func main() {
	var implementer Implementer
	RunExample(implementer)
}

func RunExample(implemented Implemented) {
	implemented.Example()
}

type Implemented interface {
	Example()
}

type Implementer struct{}

func (Implementer) Example() {
	fmt.Println("Hello, world!")
}
```

But what if you implement the interface incorrectly?

```go
package main

import "fmt"

func main() {
	var implementer Implementer
	RunExample(implementer) // A compilation error points to this line
}

func RunExample(implemented Implemented) {
	implemented.Example()
}

type Implemented interface {
	Example()
}

type Implementer struct{}

func (Implementer) Example() bool {
	fmt.Println("Hello, world!")
	return true
}
```

What I take issue with is that, because interface implementations are _implicit,_ the error points
to a line where you try to _use_ a type as an interface. In my opinion, it's better to have an
_explicit_ implementation, as the error can then point to where you _actually_ failed to implement
the interface incorrectly. Take this TypeScript example:

```typescript
interface Implemented {
  example(): boolean;
}

class Implementer implements Implemented {
  // An error is raised on the following line
  example(): void {
    console.log("Hello, world!");
  }
}

function runExample(implemented: Implemented): void {
  implemented.example();
}

runExample(new Implementer());
```

With an explicit implementation, the tooling can point to exactly where you failed to properly
implement the interface, rather than only pointing to some other place and only telling you that
the type does not satisfy the interface.

## Python

Python has a reputation as an easy language, but what I've found is that, due to the language's
scoping, there are a few beginner's traps that a new programmer might not catch.

### Beginner's traps

#### Variables are declared by being assigned

This is probably what I dislike the most.

```python
global_value = 1

def increment_global():
    global_value += 1
    return global_value
```

If you call `increment_global`, you will receive an error stating that `global_value` was referenced
before it was assigned. This is because Python sees the `+=` as an assignment, and because of that
thinks that there should be a _new_ variable called `global_value`, scoped to the function, and
any reference inside `increment_global` should use _that_ instead of the variable with the same name in
the outer scope.

This is an easy issue to solve:

```python
global_value = 1

def increment_global():
    global global_value
    global_value += 1
    return global_value
```

So why am I complaining? I believe it's a symptom of the ambiguity between declaring a variable
and assigning a value to a variable. Because you _don't_ typically use a special keyword or syntax
for declaring vs assigning in Python, you can run into issues where you wanted to only assign, but
you accidentally declared, too. Consider, for example, how Go's syntax is very clear:

```go
var x int = 1

func incGlobal() {
	x += 1
	return x
}

func incInternal() {
	// We only have an internal x variable if we've explicitly declared it with `var` or `:=`.
	x := 1
	x += 1
	return x
}
```

#### For loop scoping

```python
# names is a list of strings
for name in names:
    cleaned_name = name.title()
print("Hello", cleaned_name)
```

What does this do? If you've used another programming language, you might assume that the print
statement would fail, with a message like `'cleaned_name' is not defined`. Does Python do that?
Yes... But only if `len(names) == 0`. As long as there is at least one value in `names`, then
`cleaned_name` will be defined, and can be used outside of the for loop.

My issue with this is that, typically, it would be a mistake to use a variable defined _in_ a loop
_outside_ of the loop. And, since Python uses indentation instead of braces, it's easier to make
this type of mistake by simply accidentally un-indenting or failing to indent enough.

Additionally, regarding scoping and for loops, you might find this behavior surprising if you've
come from another language, like JavaScript:

```python
lambdas = [lambda: n for n in range(3)]
for fn in lambdas:
    print(fn())
# 2
# 2
# 2
```

#### Mutations of default values for arguments persist

```python
def append_value(value, l=[]):
    """
    Appends a value to a list. If a list isn't provided, a list with exactly one element
    (the value) will be created.
    """
    l.append(value)
    return l

print(append_value(1))
print(append_value(2))
print(append_value(3))
```

Will this print the following?

```
[1]
[2]
[3]
```

Nope! It will print this:

```
[1]
[1, 2]
[1, 2, 3]
```

For what it's worth, neither JavaScript's nor Ruby's default value features behave this way.

### Other thoughts

Despite my complaints about Python, I actually do like it, and I have used it often at work. If I
want to quickly write out a script, I'll often decide to use Python.

My issue is that it has a reputation as an easy language, and could be appealing to beginners, but
I think a beginner could get caught by confusing and unexpected behavior that they wouldn't know
to watch out for.

## Ruby

My takeaway after using Ruby a little bit is that it's a fun language, and has a lot of
opportunities to do something that might feel magic, but might also feel confusing. For example,
take a look at this code:

```ruby
# example.rb
require "./example/helper"

puts with_commas("hello world").exclamation
# hello, world!
```

Wow, that's cool! So there's a built-in function called `with_commas` and strings have a method
called `exclamation`? Nope! That comes from the required `example/helper.rb`. But how do you know
that? If this was Python, you might have `from .helper import with_commas`, which would make it
much more obvious where the `with_commas` function comes from. And some languages won't allow you to
extend a class like that (at least not without an explicit import).

`example/helper.rb` might look like this:

```ruby
def with_commas(s)
  s.split(" ").join(", ")
end

class String
  def exclamation
    "#{self}!"
  end
end
```

Rather than the language encouraging you to be clear, it's more like it's up to the author to
be aware of and follow conventions to make sure usage is not confusing. What I would say about Ruby
is that, while some languages emphasize clarity and readability, Ruby makes it much easier to write
and use shortcuts instead.

## Rust

Rust is probably the most complex language I've used. But it might also be my favorite. The reason
for this is that, when I'm using another language, I often start wishing that I could use a language
feature that's available in Rust.

### Ownership and lifetimes

What may be most confusing to newcomers are the concepts of borrowing, ownership, and lifetimes.
Take this code for example:

```rust
struct StringWrapper(&str);
```

This is a struct that has one field, a reference to a string. This will _not_ compile. This is
because `StringWrapper` is borrowing a `str` via a reference, and there is no guarantee that the
data that the reference is pointing to will exist in memory as long as `StringWrapper` does. You
have a few solutions to this. One solution is to _own_ the string using the `String` type, which
will allocate the underlying data of the string and take ownership of it:

```rust
struct StringWrapper(String);
```

Copying or cloning data is often the easiest way to handle ownership issues. Some other borrowed
types and their owned alternatives include:

| borrowed |   owned    |
| :------: | :--------: |
|  `&[T]`  |  `Vec<T>`  |
| `&Path`  | `PathBuf`  |
| `&OsStr` | `OsString` |

And if you don't know if your type will be borrowed or owned, you can either just always make
an owned copy, or optimize with
[`Cow` (clone on write, not 🐮)](https://doc.rust-lang.org/std/borrow/enum.Cow.html).

---

So taking ownership is one solution, but what's the other? Lifetimes.

```rust
struct StringWrapper<'a>(&'a str);
```

The lifetime `'a` basically asserts that the contained `&'a str` should live at least as long
as `StringWrapper`.

---

Ironically, since Rust's ownership concept is considered an _alternative_ to manual memory
management, I think the easiest way to understand these concepts is to actually _use_ a language
with manual memory management, like C. When you have to think for yourself "I cannot free this
memory until I have ensured that no more pointers to it are in use," I've found that you naturally
start to understand what borrowing, owning, and lifetimes mean in Rust.

### Safety

Rust should typically guarantee memory safety, unless you use an `unsafe` block. I think that this
fact causes some coders to try to avoid `unsafe`, and consider it to be like a sin. When you write
Rust code, you typically won't need to use the `unsafe` keyword, but I don't think it's correct to
consider `unsafe` to be _bad._ If you look through the documentation (e.g.
[`OsStr::from_encoded_bytes_unchecked`](https://doc.rust-lang.org/std/ffi/struct.OsStr.html#method.from_encoded_bytes_unchecked)),
you will see _valid_ uses of `unsafe`. All it means is that the language itself cannot guarantee
memory safety, so it is up to the author to guarantee memory safety through the code's logic
instead. For example, if you have already asserted that `bytes` will only contain valid UTF-8 bytes,
the following should actually be safe:

```rust
let bytes = b"valid UTF-8";
// SAFETY: We know that `bytes` only contains valid UTF-8.
let safe_os_string = unsafe { OsStr::from_encoded_bytes_unchecked(bytes) };
```

So, while you shouldn't overuse `unsafe`, and you'll often write an entire project without using
`unsafe`, I think it's incorrect to think that a project is unsafe and needs to be fixed just
because it has the `unsafe` keyword in its code.

### Traits

I think that Rust's traits are a really cool feature. They're a bit like interfaces from other
languages, but also allow you to extend the functionality of existing types, kind of like Ruby.
When I say to myself "I wish I was using Rust," it's usually because I wish that I had access to
the trait system and how they interact with generics. Take this example:

```rust
fn main() {
    print_pretty_type_name::<&str>();
    print_accurate_type_name::<&str>();
    print_pretty_type_name::<CustomType>();
    print_accurate_type_name::<CustomType>();
}

fn print_pretty_type_name<T: PrettyTypeName>() {
    println!("{}", T::pretty_type_name())
}

fn print_accurate_type_name<T: AccurateTypeName>() {
    println!("Called with a {}", T::type_name())
}

trait PrettyTypeName {
    fn type_name() -> &'static str;

    fn pretty_type_name() -> String {
        format!("I am a {}!", Self::type_name())
    }
}


trait AccurateTypeName {
    fn type_name() -> &'static str;
}

impl PrettyTypeName for &str {
    fn type_name() -> &'static str {
        "string"
    }
}


impl AccurateTypeName for &str {
    fn type_name() -> &'static str {
        "&str"
    }
}

struct CustomType;


impl PrettyTypeName for CustomType {
    fn type_name() -> &'static str {
        "custom type"
    }

    fn pretty_type_name() -> String {
        String::from("This is a custom type!")
    }
}


impl AccurateTypeName for CustomType {
    fn type_name() -> &'static str {
        "CustomType"
    }
}
```

This example only scratches the surface of traits. It doesn't cover:

- Methods that take `self`.
- Usage with `Box<dyn TraitName>`, which is somewhat similar to `interface` in other programming
  languages.
- Associated types.
- Associated constants.

This example does illustrate what I like about traits:

- Because of the syntax `impl TraitName for Type {}`, it is _not_ a conflict if two traits have
  associated functions or methods with the same name.
- You can automatically add default behavior to a trait (`PrettyTypeName::pretty_type_name`).
- Traits can be used as constraints in generics, allowing you to write a function once for all
  types that implement those traits.
- We can implement traits not only on a type we define, but also on an _existing_ type.

### Macros

I like and dislike Rust's macros for the same reason: you can do pretty much anything with them. If
you write a procedural macro, you can even do things like parse JSON at _compile-time._ That might
be handy for making a concise shortcut to generate code, but it can also make your API opaque and
hard to understand. I can look at a function signature and get a decent idea of what the output is,
but I can't really know what a macro outputs without reading its documentation and/or source code.

## TypeScript

I'm going to talk a lot about JavaScript in this section, because I don't really see value in
talking about JavaScript and TypeScript separately.

To put it simply: if I want something to run in the browser, I probably want to use JavaScript or
TypeScript. I _can_ compile Go or Rust to [WASM](https://en.wikipedia.org/wiki/WebAssembly) to run
in the browser, but if the browser is a main goal then I'm picking TypeScript. The reason I
gravitate to TypeScript over JavaScript is simply that I enjoy relying on types to improve code
suggestions and to also easily document intent. For example, take this JavaScript:

```javascript
export function add(a, b) {
  return a + b;
}
```

`+` is valid not only for numbers, but also for strings, and other types. So, from this example
alone, it might be hard to tell if it's intended only for number types, or for all types that
support addition. TypeScript can clarify this a bit:

```typescript
export function add(a: number, b: number): number;
export function add(a: string, b: string): string;
export function add(a: number | string, b: number | string): number | string {
  return a + (b as any);
}

add(1, 2);
add("Hello, ", "World!");
add(1, "two");
```

The generated type declaration would be this:

```typescript
export declare function add(a: number, b: number): number;
export declare function add(a: string, b: string): string;
```

Now we know that if we pass two numbers to `add`, we get a number, if we pass two strings to
`add`, we should get a string. The third call to `add`, which passes one number and one string,
is undefined behavior, and will cause the compiler to raise an error.

You might notice something unfortunate in this example: I used `as any`. `+` is valid between
`number` and `number`, and `+` is valid between `string` and `string`, but `+` is _not_ valid
between `number | string` and `number | string`. So, if I dropped that `as any`, the TypeScript
compiler would worry that I might potentially add a number and a string together.

Some developers consider `as any` to be a sin, because it essentially disables type checking. I
think this is a good time to point this out: I think it's actually okay to disable type checking
sometimes, as long as the _usage_ is still checked. In other words, I'm not too worried about
type violations in a small utility, but I _would_ be worried if _calls_ to that utility violated
the type. I think that, in this type of example, it's better to assert proper behavior of the
utility function with _tests,_ rather than depend on the type checker. This is generally my
attitude towards TypeScript. I'm not very interested in using the type system to _prevent_ me from
violating types, but I _am_ interested in adding types to JavaScript to communicate intent.
Tooling (like LSPs) will know that I intend for `add` to return either a string or a number depending on the
arguments' type, and can add appropriate type inferences that can improve completions. Human readers
can look at the type of `add` and understand its intent without needing to read a documentation comment.

---

I think that you should learn JavaScript if you're learning programming, partially because it's
popular enough that it appears to me to be a
[lingua franca](https://en.wikipedia.org/wiki/Lingua_franca). If I'm writing an example, and I want
the example to be easily understandable to a wide audience, I'll often write it in JavaScript or
TypeScript.
