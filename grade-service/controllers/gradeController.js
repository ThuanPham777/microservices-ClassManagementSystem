const gradeService = require('../services/gradeService');

const gradeControllers = {
  getAllGradesOfSingleClassByTeacher: async (req, res) => {
    try {
      const { IdClass } = req.params;
      const grades = await gradeService.getAllGradesOfSingleClassByTeacher(
        IdClass
      );
      res.status(200).json(grades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addGrade: async (req, res) => {
    try {
      const { IdClass } = req.params;
      const newGradeId = await gradeService.addGrade(IdClass, req.body);
      res.status(201).json({
        message: 'Grade added successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateGradeScoreOfStudentInClass: async (req, res) => {
    try {
      const IdStudent = 1; // set hard data
      const { IdClass } = req.params;
      const { score } = req.body;
      //console.log('score: ' + score);
      const newGradeScoreId =
        await gradeService.updateGradeScoreOfStudentInClass(
          IdClass,
          IdStudent,
          score
        );
      res.status(201).json({
        message: 'Grade score added successfully',
        gradeScoreId: newGradeScoreId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = gradeControllers;
