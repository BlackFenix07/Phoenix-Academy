const express = require('express');
const router = express.Router();
const CoursesController  = require('../Controllers/coursesController.js');

router.get('/', CoursesController.query);

router.post('/', CoursesController.insert);
router.post('/associate-student', CoursesController.associateStudent);

router.route('/:id')
  .get(CoursesController.queryDetail)
  .put(CoursesController.update)
  .delete(CoursesController.delete);

module.exports = router;
