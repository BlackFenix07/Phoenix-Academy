const express = require('express');
const router = express.Router();
const TeachersController = require('../Controllers/teachersController.js');

router.get('/', TeachersController.query);

router.post('/', TeachersController.insert);

router.route('/:id')
  .get(TeachersController.queryDetail)
  .put(TeachersController.update)
  .delete(TeachersController.delete);

module.exports = router;
