// const User = require('../models/User');
const fs = require('fs');
const config = require('../config');
const {readFileAsync,writeFileAsync,getAllKeysAndValues} = require('../utils/dataProcessing');

const dataPath = config.jsonPath;
const port = config.port;

exports.getDefault = (req, res) => {
  res.send(`Express server is running at http://localhost:${port}`);
};

exports.getAllList = (req, res) => {
  readFileAsync(dataPath)
  .then(data => {
    res.send(getAllKeysAndValues(JSON.parse(data)));
  })
  .catch(err => {
    console.error('Error Read:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
};

exports.updateData = (req, res) => {
  const parameter = req.params.parameter;
  readFileAsync(dataPath).then(data => {
    const jsonData =JSON.parse(data)
    const updateData={}
    console.log(parameter)
    console.log(res)
    updateData[parameter]=res.value
    writeFileAsync(dataPath, updateData)
  .catch(error => {
    console.error(error.message);
  });
    // let dataList=getAllKeysAndValues(JSON.parse(data))
    // res.send(dataList);
  })
  .catch(err => {
    console.error('Error Read:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
};

// exports.createUser = (req, res) => {
//   res.send('Create a new user');
// };
