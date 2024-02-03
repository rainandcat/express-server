const _ = require('lodash');

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

function parsePath(path) {
  const regex = /(\w+)|\[(\d+)\]/g;
  const matches = [];

  let match;
  while ((match = regex.exec(path)) !== null) {
    matches.push(match[1] || match[2]);
  }

  return matches;
}

function updateJsonValue(jsonObj, keys, newValue) {
  if (keys.length === 1) {
    const key = keys[0];

    if (Array.isArray(jsonObj[key])) {
      jsonObj[key].forEach((item, index) => {
        updateJsonValue(item, [], newValue); 
      });
    } else if (jsonObj[key] && typeof jsonObj[key] === 'object') {
      jsonObj[key] = newValue;
    } else {
      jsonObj[key] = newValue;
    }
  } else {
    const currentKey = keys.shift();
    if (jsonObj[currentKey] && typeof jsonObj[currentKey] === 'object') {
      updateJsonValue(jsonObj[currentKey], keys, newValue);
    }
  }
}

function deleteKeyByPath(obj, keyPath) {
  _.unset(obj, keyPath);
  console.log(`Key path '${keyPath}' deleted successfully.`);
}
module.exports= {getAllKeysAndValues,parsePath,updateJsonValue,deleteKeyByPath };