---
layout: default
title: HTTP Methods with Go
nav_order: 4
---

# HTTP Methods with Go

{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Introduction

HTTP is a protocol for transmitting data over the internet. It is used to request and deliver web content and is based on a client-server model. HTTP methods indicate the action the client wants the server to perform. Data is transmitted in HTTP messages with a header and body. HTTP is stateless and widely used on the internet.

1. GET retrieves information from the server.
2. POST sends information to the server.
3. HEAD retrieves only the headers of a resource, rather than the full resource itself.
4. PUT updates information on the server.
5. DELETE deletes information from the server.
6. CONNECT establishes a tunnel connection to a server, primarily used with proxies.
7. OPTIONS describes the communication options for a target resource.
8. TRACE performs a message loop-back test along the path to the target resource.
9. PATCH applies partial modifications to a resource.

## GET

When you type a [URL](https://stackoverflow.com/questions/10216560/anything-that-is-typed-into-a-browsers-address-bar-is-a-get-request) into the address bar of your browser and hit enter, the browser sends a GET request to the server. For example,

```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36
Accept-Language: en-US,en
```

This GET request is asking the server at "www.example.com" to retrieve the "index.html" file via HTTP/1.1 protocol. The "Host" field specifies the server hostname, and the "User-Agent" field provides information about the client making the request. The "Accept-Language" field indicates the preferred language of the client. These fields, along with others, can be included in a GET request to provide additional information to the server.

### How to handle GET requests

For three cases, an HTTP server is created and listens for incoming requests on a specified port. A function is defined to handle requests made to a `/index.html`. The function writes a response to the request and accesses information about the request. The server listens for requests and calls the handling function until it is stopped or encounters an error.

#### Handle Get Request using http package
~~~Go 
handleGet := func(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet{
		fmt.Fprint(w, "<h1>Hello, world!</h1>")
	}
}

http.HandleFunc("/index.html", handleGet)
http.ListenAndServe(":8080", nil)
~~~

#### Handle Get Request using gin

~~~Go 
router := gin.Default()
handleGet := func(c *gin.Context) {
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, "<h1>Hello, world222!</h1>")
}

router.GET("/index.html", handleGet)

router.Run(":8080")
~~~

#### Handle Get Request using mux

~~~Go 
r := mux.NewRouter()

handleGet := func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintf(w, "<h1>Hello, world!</h1>")
}

r.HandleFunc("/index.html", handleGet).Methods("GET")

http.ListenAndServe(":8080", r)
~~~

## POST

```
POST /post HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 15

{"message": "Hello"}
```

This is a POST request to the URL "http://example.com/post" with a request body containing a JSON object with a "message" field. The "Content-Type" header is set to "application/json" to indicate that the request body is in JSON format, and the "Content-Length" header is set to the length of the request body.

You can send a POST request using a tool like cURL or a web browser, or programmatically using an HTTP library like the http package in Go or the requests library in Python.

### How to handle POST request

#### Handle POST Request using http package

~~~Go 
handlePost := func(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var item Item
	err := decoder.Decode(&item)
	if err != nil {
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}
	db[item.Key] = item.Value
	fmt.Fprintf(w, "Added item with key %s and value %s to the database", item.Key, item.Value)
}

readItems := func(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	for k, v := range db {
		item := fmt.Sprintf("%v: %v\n", k, v)
		w.Write([]byte(item))
	}
}

http.HandleFunc("/add", handlePost)
http.HandleFunc("/read", readItems)

http.ListenAndServe(":8080", nil)
~~~

This code creates an HTTP server and defines a route at the "/add" path that handles POST requests. The route handler function decodes the request body as a JSON object containing an "key" and "value" field. It then adds an item to the map with the key and value from the JSON object.


To test this server, you can send a POST request with a JSON body containing an "key" and "value" field to the "/add" path. For example, using cURL:

```
curl -X POST -H "Content-Type: application/json" -d '{"key": "foo", "value": "bar"}' http://localhost:8080/add
```

You can check the values of list with a GET request to the `/read`.

#### Handle POST Request using Gin

~~~Go 
router := gin.Default()

handlePost := func(c *gin.Context) {
	var item Item
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error decoding request body"})
		return
	}
	db[item.Key] = item.Value
	c.String(http.StatusOK, fmt.Sprintf("Added item with key %s and value %s to the database", item.Key, item.Value))
}

readItems := func(c *gin.Context) {
	var items []string
	for k, v := range db {
		item := fmt.Sprintf("%v: %v\n", k, v)
		items = append(items, item)
	}
	c.String(http.StatusOK, strings.Join(items, "\n"))
}

router.POST("/add", handlePost)
router.GET("/read", readItems)

router.Run()
~~~

* The code uses the Gin router and route handler functions instead of the http.HandleFunc and http.ListenAndServe functions.
* The route handler functions use the Context object provided by Gin to read the request body and write the response, instead of the http.ResponseWriter and http.Request objects.
* The request method is checked using the Context.Request.Method field instead of the http.MethodPost and http.MethodGet constants.
The response is written using the Context.String function instead of the http.ResponseWriter.Write function.

#### Handle POST Request using mux

~~~Go 
router := mux.NewRouter()

handlePost := func(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var item Item
	err := decoder.Decode(&item)
	if err != nil {
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}
	db[item.Key] = item.Value
	fmt.Fprintf(w, "Added item with key %s and value %s to the database", item.Key, item.Value)
}

readItems := func(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	for k, v := range db {
		item := fmt.Sprintf("%v: %v\n", k, v)
		w.Write([]byte(item))
	}
}

router.HandleFunc("/add", handlePost).Methods(http.MethodPost)
router.HandleFunc("/read", readItems).Methods(http.MethodGet)

http.ListenAndServe(":8080", router)
~~~

## HEAD

The HTTP HEAD method is used to retrieve the header information of a resource. It is similar to the GET method, but it only requests the header information, not the actual resource.

```
HEAD /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36
Accept-Language: en-US,en;q=0.9
```

The server's response to a HEAD request would include the header information for the requested resource, but not the resource itself.

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234
Last-Modified: Mon, 01 Jan 2021 00:00:00 GMT
ETag: "1234567890"
Cache-Control: max-age=3600
```

To be continued...

## Best Practices

### Mux
Creating http router in a function with handlers then pass return value in server creation.

~~~Go
func New() http.Handler {
	mux := http.NewServeMux()
	// Root
	mux.Handle("/", http.FileServer(http.Dir("UserService/templates/")))

	// OauthGoogle
	mux.HandleFunc("/auth/google/login", oauthGoogleLogin)
	mux.HandleFunc("/auth/google/callback", oauthGoogleCallback)

	return mux
}
~~~

In main function, where we run our server;

~~~Go 
server := &http.Server{
		Addr:    fmt.Sprintf(":8000"),
		Handler: SomePackage.New(),
	}
/*...*/	
server.ListenAndServe()
~~~

This is much cleaner approach than writing all the handlers in main package.