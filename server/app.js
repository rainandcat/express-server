const express = require('express')
const fs = require('fs/promises');
const path = require('path');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'vue-app')));

app.post('/update-json', async (req, res) => {
  try {
    const newData = req.body;

    const filePath = path.join(__dirname, 'data.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    Object.assign(jsonData, newData);

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

    res.status(200).json({ success: true, message: 'JSON update success' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Update fail' });
  }
});

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`)
})
