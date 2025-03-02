const gradeModel = require('../models/gradeModel');

const gradeService = {
  // Method to get all grades
  async getAllGradesOfSingleClassByTeacher(IdClass) {
    return await gradeModel.getAllGradesOfSingleClassByTeacher(IdClass);
  },

  async addGrade(IdClass, gradeData) {
    return await gradeModel.addGrade(IdClass, gradeData);
  },
};

module.exports = gradeService;
