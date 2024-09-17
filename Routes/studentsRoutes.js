const express = require('express');
const router = express.Router();
const StudentsController = require('../Controllers/studentsController.js');

router.get('/', StudentsController.query);

router.post('/', StudentsController.insert);

router.route('/:id')
  .get(StudentsController.queryDetail)
  .put(StudentsController.update)
  .delete(StudentsController.delete);

module.exports = router;
