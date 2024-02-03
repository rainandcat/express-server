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

module.exports= {readFileAsync,writeFileAsync};