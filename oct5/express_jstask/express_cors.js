/*

Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. 

A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos.
Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy. 
CORS defines a way in which a browser and server can interact to determine whether it is safe to allow the cross-origin request.
It allows for more freedom and functionality than purely same-origin requests, but is more secure than simply allowing all cross-origin requests.


Simple Usage (Enable All CORS Requests)

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

*/


const express = require('express')
const cors = require('cors')
const app = express()

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})



