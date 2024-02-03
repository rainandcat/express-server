// const User = require('../models/User');
const fs = require('fs');
const config = require('../config');
const {readFileAsync,writeFileAsync,getAllKeysAndValues,parsePath,updateJsonValue} = require('../utils/dataProcessing');

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
  const resourceKay = req.params.key;
  const resourceValue =req.body
  readFileAsync(dataPath).then(data => {
    const jsonData=JSON.parse(data)
    const jsonKeyValuesData =getAllKeysAndValues(jsonData)
    const hasMatchingValue =jsonKeyValuesData.some(obj => obj.key === resourceKay);

    if (!hasMatchingValue)
      return res.status(500).json({ error: `Key ${resourceKay} found in the JSON.` });

    updateJsonValue(jsonData, parsePath(resourceKay), resourceValue.value);

    writeFileAsync(dataPath, JSON.stringify(jsonData, null, 2))
    .catch(error => {
      console.error(error.message);
      return res.status(500).json({ error: `Unable to write to file` });
    });
    res.send('File has been successfully written.');
  })
  .catch(err => {
    console.error('Error Read:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
};

// exports.createUser = (req, res) => {
//   res.send('Create a new user');
// };
