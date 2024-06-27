// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Date API
app.get("/api/:date?", (req, res) => {
  // Extract date param and init date object
  const dateParam = req.params.date;
  let dateObject;

  // Based on date param to process date object
  if(!dateParam)
    dateObject = new Date();
  else if(/^-?\d+/.test(dateParam))
    dateObject = new Date(parseInt(dateParam));
  else dateObject = new Date(dateParam);

  // Response based on date object
  if(isNaN(dateObject))
    return res.json({error : 'Invalid Date'});
  else
    return res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()});
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
