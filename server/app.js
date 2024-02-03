const express = require('express')
const config = require('./config');

const app = express()
const port = config.port;

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`)
})
