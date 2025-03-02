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
        gradeId: newGradeId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = gradeControllers;
