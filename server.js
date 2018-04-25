const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Serving stuff...');
});
