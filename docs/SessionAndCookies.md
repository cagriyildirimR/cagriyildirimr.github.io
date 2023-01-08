---
layout: default
title: Sessions and Cookies
nav_order: 8
---

# Sessions and Cookies

{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---
# DRAFT
## Introduction

* Cookies are used to store small amounts of data that are needed by a web application across multiple requests, while sessions are used to store larger amounts of data that are needed by a single user during a single session on the application.
* Cookies are stored on the client side and are persisted even after the user closes the browser or shuts down their computer. Sessions are stored on the server side and are typically destroyed when the user closes the browser or logs out of the application.
* Cookies have a maximum size of 4KB, while sessions can store much larger amounts of data.
* Cookies are sent with every request to the server, making them vulnerable to certain types of attacks. Sessions are stored on the server and are generally more secure, although they can still be vulnerable to certain types of attacks if not properly configured.

## Creating/Deleting and Retrieving Cookies in Go

### Creating Cookie
```
cookie := &http.Cookie{
    Name    : "session_id
    Value   : uuid.NewRandom().String()
    Expires : time.Now().Add(365 * 24 * time.Hour) 
}
http.SetCookie(w, cookie)
```
### Deleting Cookie
Deleting is simply setting cookie's `MaxAge` to `-1`

```
cookie.MaxAge = -1
```

### Reading Cookie

```
c, err := r.Cookie("my-cookie-key")
```

`err` is `nil` if we retrieve said cookie or `ErrNoCookie` if cookie doesn't exist.

## Redis as session storage

Verifying the user's session on every request can add some overhead to the application, as the server needs to look up the user's session using the session ID stored in the cookie, and retrieve any data that has been stored in the session. However, this overhead is typically small and is usually not a significant problem in most applications.

To minimize the overhead, it is generally a good idea to store the session data in a fast, in-memory store (such as an in-memory cache) rather than a database. This allows the server to quickly look up the user's session data without the need for a costly database query on every request.

Redis is an open source, in-memory, key-value data store most commonly used as a primary database, cache, message broker, and queue. Redis delivers sub-millisecond response times, enabling fast and powerful real-time applications in industries such as gaming, fintech, ad-tech, social media, healthcare, and IoT.

### How to use Redis

Redis is very simple to use with Go. [1](https://redis.uptrace.dev/guide/go-redis.html#connecting-to-redis-server)

```
redisClient = redis.NewClient(&redis.Options{
    Addr:     "localhost:6379",
    Password: "none", // no password set
    DB:       0,  // use default DB
})

ctx := context.Background()

redisClient.Set(ctx, "abc", 100, time.Second*10)

fmt.Println(redisClient.Get(ctx, "abc")) // Output:100
```
