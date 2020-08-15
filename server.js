const express = require('express');
const http = require('http')
const path = require('path');

const app = express();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(allowCrossDomain);
  app.use(express.static(__dirname + '/dist/covidTracker'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/covidTracker/index.html'));
});

app.route('/*', function(req,res) {
  res.redirect(__dirname + '/dist/covidTracker/index.html')
})

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
