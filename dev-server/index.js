var express = require('express');
var app = express();
var path = require('path');

const baseDir = path.join(__dirname + '/../dist');

app.use(express.static(baseDir));

app.get('/*', function (req, res) {
  res.sendFile(baseDir + '/index.html');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running at: ${port}`);
});
