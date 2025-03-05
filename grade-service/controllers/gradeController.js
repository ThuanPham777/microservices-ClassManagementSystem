const gradeService = require('../services/gradeService');

const gradeControllers = {
  getStudentGradesOfSingleClass: async (req, res) => {
    try {
      const { IdClass } = req.params;
      const studentGrades = await gradeService.getStudentGradesOfSingleClass(
        IdClass
      );
      res.status(200).json(studentGrades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getGradeStructuresOfSingleClass: async (req, res) => {
    try {
      const { IdClass } = req.params;
      const gradeStructures =
        await gradeService.getGradeStructuresOfSingleClass(IdClass);
      res.status(200).json(gradeStructures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addGradeStructure: async (req, res) => {
    try {
      const { IdClass } = req.params;
      await gradeService.addGradeStructure(IdClass, req.body);
      res.status(201).json({
        message: 'Grade Structure added successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateGradeStructure: async (req, res) => {
    try {
      const { IdGradeStructure, IdClass } = req.params;
      //console.log('Grade structure: ', IdGradeStructure, ' class: ', IdClass);
      await gradeService.updateGradeStructre(
        IdGradeStructure,
        IdClass,
        req.body
      );
      res.status(200).json({
        success: true,
        message: 'Grade Structure updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteGradeStructure: async (req, res) => {
    try {
      const { IdGradeStructure, IdClass } = req.params;
      await gradeService.deleteGradeStructure(IdGradeStructure, IdClass);
      res.status(200).json({ message: 'Grade Structure deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addGradeScoreOfStudentInClass: async (req, res) => {
    try {
      const { IdClass, IdGradeStructure, IdUser } = req.params;
      const { score } = req.body;
      //console.log('score: ' + score);
      await gradeService.addGradeScoreOfStudentInClass(
        IdGradeStructure,
        IdClass,
        IdUser,
        score
      );
      res.status(201).json({
        message: 'Grade score added successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateGradeScoreOfStudentInClass: async (req, res) => {
    try {
      const { IdClass, IdGradeStructure, IdUser } = req.params;
      const { score } = req.body;
      //console.log('score: ' + score);
      await gradeService.updateGradeScoreOfStudentInClass(
        IdGradeStructure,
        IdClass,
        IdUser,
        score
      );
      res.status(200).json({
        success: true,
        message: 'Grade score updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = gradeControllers;
