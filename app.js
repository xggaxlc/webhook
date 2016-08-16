var path = require('path');
var express = require('express');
var config = require('./config');
var exec = require('child_process').exec;

var app = express();

config.webhooks.forEach(function(item) {
  app.post(item.route, function(req, res) {
    var cmd = 'cd ' + item.path + ' && git pull';

    exec(cmd, function(err, stdout) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        console.log(item.path + ' pull success! ');
        console.log(stdout);
        res.status(200).end();
      }
    });
  });
});

app.listen(config.port, function() {
  console.log('webhook listening on %d', config.port);
});