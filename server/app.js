const express = require('express')
const config = require('./config');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express()
const port = config.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRouter); 

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`)
})
