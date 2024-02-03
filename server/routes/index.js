const express = require('express');
const router = express.Router();
const jsonController = require('../controllers/jsonController');

router.get('/', jsonController.getDefault);
router.get('/resources', jsonController.getAllList);
router.put('/resources/:parameter', jsonController.updateData);
// router.get('/user', jsonController.getUser);
// router.post('/user', jsonController.createUser);
  
module.exports = router;