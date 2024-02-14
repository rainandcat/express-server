const config = require('../config');
const {getAllKeysAndValues,parsePath,updateJsonValue,deleteKeyByPath} = require('../utils/dataProcessing');
const {readFileAsync,writeFileAsync} = require('../utils/fileAsync');

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

exports.addData = (req, res) => {
  const resourceKay = req.params.key;
  const resourceValue =req.body
  readFileAsync(dataPath).then(data => {
    const jsonData=JSON.parse(data)
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

exports.deleteData = (req, res) => {
  const resourceKay = req.params.key;
  readFileAsync(dataPath).then(data => {
    const jsonData=JSON.parse(data)
    deleteKeyByPath(jsonData,resourceKay)

    writeFileAsync(dataPath, JSON.stringify(jsonData, null, 2))
    .catch(error => {
      console.error(error.message);
      return res.status(500).json({ error: `Unable to delete to file` });
    });
    res.send('File key has been successfully delete.');
  })
  .catch(err => {
    console.error('Error Read:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
};

exports.downloadExampleFile = (req, res) => {
  const filePath = 'server/file/example.xlsx'; 
  res.download(filePath, function(err){
    if (err) {
      res.status(404).send('File not found');
    }
  });
};

