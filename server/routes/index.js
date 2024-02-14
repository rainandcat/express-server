const express = require('express');
const router = express.Router();
const jsonController = require('../controllers/jsonController');

router.get('/', jsonController.getDefault);
router.get('/resources', jsonController.getAllList);
router.put('/resources/:key', jsonController.updateData);
router.post('/resources/:key', jsonController.addData);
router.delete('/resources/:key', jsonController.deleteData);
router.get('/download/example', jsonController.downloadExampleFile);
  
module.exports = router;