var express = require('express');
var path = require('path');
var compression = require('compression');
var app = express();
var cors = require("cors");
app.use (cors ({source: '/'}))
app.use(express.static('public'));
app.use(compression());
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
var http = require('http').Server(app);


// Start server
const POST = 4000;
console.log(`LISTENING....${POST}`)
http.listen(process.env.PORT || POST);