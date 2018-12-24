'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const publicFolder = path.join(__dirname, 'static');

const serveGzip = contentType => (req, res, next) => {
  const gzFile = req.url + '.gz';
  const gzFileExist = fs.existsSync(path.join(__dirname, gzFile));
  if (!gzFileExist) {
    return void next()
  }

  req.url = gzFile;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', contentType);
  res.sendFile(req.url, { root: __dirname });
};

app.get('*/service-worker.js', function (req, res) {
  res.set('Service-Worker-Allowed', '/');
  res.sendFile(req.url, { root: __dirname });
});

app.get('*.js', serveGzip('text/javascript'));
app.get('*.css', serveGzip('text/css'));

app.use('/static', express.static(publicFolder));

app.use(function (req, res) {
  res.sendFile('index.html', { root: publicFolder });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});