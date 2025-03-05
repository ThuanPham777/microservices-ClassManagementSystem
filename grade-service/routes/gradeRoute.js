const express = require('express');

const router = express.Router();

const gradeController = require('../controllers/gradeController');

router.get(
  '/class/:IdClass/grades',
  gradeController.getGradeStructuresOfSingleClass
);

router.get(
  '/class/:IdClass/studentGrades',
  gradeController.getStudentGradesOfSingleClass
);

router.post('/class/:IdClass/grade/add', gradeController.addGradeStructure);

router.put(
  '/:IdGradeStructure/class/:IdClass/update',
  gradeController.updateGradeStructure
);

router.delete(
  '/:IdGradeStructure/class/:IdClass/delete',
  gradeController.deleteGradeStructure
);

router.post(
  '/:IdGradeStructure/class/:IdClass/student/:IdUser/score/add',
  gradeController.addGradeScoreOfStudentInClass
);

router.put(
  '/:IdGradeStructure/class/:IdClass/student/:IdUser/score/update',
  gradeController.updateGradeScoreOfStudentInClass
);
module.exports = router;
