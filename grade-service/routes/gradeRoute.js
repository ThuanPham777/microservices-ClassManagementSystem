const express = require('express');

const router = express.Router();

const gradeController = require('../controllers/gradeController');

router.get(
  '/class/:IdClass/grades',
  gradeController.getAllGradesOfSingleClassByTeacher
);

router.post('/class/:IdClass/grade/add', gradeController.addGrade);

router.post(
  '/class/:IdClass/score/update',
  gradeController.updateGradeScoreOfStudentInClass
);

module.exports = router;
