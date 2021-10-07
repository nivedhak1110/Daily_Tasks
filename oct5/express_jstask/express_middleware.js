/*
Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

    Execute any code.
    Make changes to the request and the response objects.
    End the request-response cycle.
    Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

    Application-level middleware:
    Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

    Router-level middleware:
    Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router()
    
    Error-handling middleware:
    Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next))

    Built-in middleware:
    express.static serves static assets such as HTML files, images, and so on.
    express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
    express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+

    A payload in API is the actual data pack that is sent with the GET method in HTTP. 
    It is the crucial information that you submit to the server when you are making an API request. 
    The payload can be sent or received in various formats, including JSON.


    Third-party middleware:
    Cookies are text files with small pieces of data — like a username and password — that are used to identify your computer as you use a computer network
    cookieParser()

*/ 

//application level middleware  example
const express = require('express')
const app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
