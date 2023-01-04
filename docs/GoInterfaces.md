---
layout: default
title: Go Interfaces
nav_order: 6
---

# Go Interfaces

{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Introduction

In the Go programming language, an interface is a type that specifies a set of methods that a type must implement. Interfaces allow you to define a contract for types that specify what methods they must have, without specifying how those methods should be implemented.

Here is an example of an interface in Go:

```
type Shape interface {
    Area() float64
    Perimeter() float64
}
```

This `Shape` interface defines two methods: `Area` and `Perimeter`. Go interfaces are implemented implicitly. Any type that implements these two methods is said to implement the `Shape` interface. For example, you could define a `Rectangle` type that implements the `Shape` interface like this:

```
type Rectangle struct {
    width, height float64
}

func (r Rectangle) Area() float64 {
    return r.width * r.height
}

func (r Rectangle) Perimeter() float64 {
    return 2*r.width + 2*r.height
}
```

In this example, the `Rectangle` type has implemented the `Area` and `Perimeter` methods, so it satisfies the `Shape` interface. You can then use the `Rectangle` type wherever a `Shape` is expected, because a Rectangle is a Shape.

`Interfaces` are a powerful feature of Go that allows you to write code that is more **flexible** and **reusable**. They are often used in conjunction with **polymorphism**, where you can use a single interface type to refer to multiple types that implement it. **Interfaces allows you to write code that can work with different types without needing to know exactly what type it is working with.**

By defining a **contract**, you can write code that expects a type to have certain methods, without needing to know exactly what type it is working with. This allows you to write code that is more flexible and reusable, as it can work with any type that satisfies the interface.

For example, you might write a function that takes a `Shape` as an argument and calculates the total area of all the shapes in a list. You can use this function with any type that satisfies the `Shape` interface, such as a `Rectangle`, a `Circle`, or a `Triangle`, without needing to know exactly what type of shape you are working with. This makes your code more flexible and easier to maintain, as you can add new types that implement the Shape interface without needing to modify the code that uses them.

```
func totalArea(shapes []Shape) float64 {
    var total float64
    for _, shape := range shapes {
        total += shape.Area()
    }
    return total
}
```

## Interface Satisfaction

```
var w io.Writer
w = os.Stdout         // OK: *os.File has Write method
w = new(bytes.Buffer) // OK: *bytes.Buffer has Write method
w = time.Second       // compile error: time.Duration lacks Write method

var rwc io.ReadWriteCloser
rwc = os.Stdout         // OK: has Read, Write and Close methods
rwc = new(bytes.Buffer) // compile error: no Close method

w = rwc // OK
rwc = w // compile error
```  

There is a subtle logic behind type having methods and pointer of said type having a method. 

```
type IntSet struct {}

func (*IntSet) String() string

var _ = IntSet{}.String() // compile error: String requires *IntSet receiver
```

However we can call it on IntSet variable.

```
var s IntSet
var _ = s.String() // OK: s is a variable and &s has a String method
// sytactic sugar same as (&s).String()
```

However only *IntSet satisfies `fmt.Stringer` interface.

```
var _ fmt.Stringer = &s // OK
var _ fmt.Stringer = s  // compile error. IntSet has no String method
```

In Go, we can define new abstractions or groupings of interest when we need them, without modifiying the declaration of the concrete type. This is particularly useful when the concrete type comes from a package written by different author. 

### interface{} says nothing

```
var any interface{}
any = true
any = 12.34
any = "hello"
any = map[string]int{"one": 1}
new(bytes.Buffer)
```

### Type assertion pattern

```
var _ io.Writer = (*bytes.Buffer)(nil)
```
This line of code is using the blank identifier `_` to discard the value of the assignment. It is declaring a variable of type `io.Writer` and initializing it with the value `(*bytes.Buffer)(nil)`. The `(*bytes.Buffer)(nil)` expression creates a pointer to a `bytes.Buffer` type with a value of nil.

The purpose of this line of code is to check if the `bytes.Buffer` type satisfies the `io.Writer` interface at **compile time**. If the `bytes.Buffer` type does not have the methods required by the `io.Writer` interface, the compiler will produce an error. If the `bytes.Buffer` type does have the required methods, the line of code will be valid and the assignment will be discarded by the blank identifier.

This technique is often used in Go to check if a type satisfies an interface at compile time, without actually creating an instance of the type or using the value. It is a way of ensuring that a type has the required methods to satisfy an interface, without actually using the value of the type.

### Anonymous interface casting

```
func Unwrap(err error) error {
	u, ok := err.(interface {
		Unwrap() error
	})
	if !ok {
		return nil
	}
	return u.Unwrap()
}
```

The Unwrap function is a utility function that is used to unwrap an error value that has been wrapped by another error value. It does this by checking if the error value implements an Unwrap method, which is expected to return the underlying error value.

The function begins by using type assertion to check if the error value implements the anonymous interface interface{ Unwrap() error }. If it does, the function assigns the error value to the u variable and sets the ok variable to true. If the error value does not implement the anonymous interface, the ok variable is set to false.

If the error value does not implement the Unwrap method, the function returns nil. Otherwise, it returns the result of calling the Unwrap method on the error value.

This function can be used to unwrap an error value that has been wrapped by another error value, and retrieve the underlying error value. It is often used in Go to handle errors that have been wrapped by multiple layers of wrapping.

## Interface Values

Go variable are always initilized to a well-defined value.

```
var w io.Writer
```

`w` has type and value both set to `nil`.

```
w = os.Stdout
```
now type is set to `*os.File`.

## A Few Words of Advice

Interfaces are only needed when there are two or more concrete types that must be dealth with in a uniform way. However when interface is satisfied by single concrete type but type cannot live in the same package as the interface because of its dependencies. In that case, an interface is good way to decouple things. 

## Sources
[The Go Programming Language](https://www.gopl.io/)