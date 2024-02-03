
const fs = require('fs/promises');

async function readFileAsync(dataPath, options = 'utf8') {
    try {
        const content =await fs.readFile(dataPath, options);
        return content;
    } catch (error) {
      throw new Error(`Unable to read file: ${error.message}`);
    }
}

async function writeFileAsync(dataPath, data, options = 'utf8') {
    try {
      await fs.writeFile(dataPath, data, options);
      console.log(`File "${dataPath}" has been successfully written.`);
    } catch (error) {
      throw new Error(`Unable to write to file: ${error.message}`);
    }
}

function getAllKeysAndValues(jsonObj, parentKey = '') {
    let keyValues = [];
  
    for (let key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        const currentKey = parentKey ? `${parentKey}.${key}` : key;
        const value = jsonObj[key];
  
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          keyValues = keyValues.concat(getAllKeysAndValues(value, currentKey));
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
              keyValues = keyValues.concat(getAllKeysAndValues(item, `${currentKey}[${index}]`));
            } else {
              if (typeof item === 'number' || typeof item === 'string') {
                keyValues.push({ key: `${currentKey}[${index}]`, value: item });
              }
            }
          });
        } else {
          if (typeof value === 'number' || typeof value === 'string') {
            keyValues.push({ key: currentKey, value: value });
          }
        }
      }
    }
  
    return keyValues;
  }

module.exports= {readFileAsync,writeFileAsync,getAllKeysAndValues };