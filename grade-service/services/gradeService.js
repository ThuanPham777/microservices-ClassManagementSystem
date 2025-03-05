const gradeModel = require('../models/gradeModel');
const redisClient = require('../config/redis');

const gradeService = {
  async getStudentGradesOfSingleClass(classId) {
    const cacheKey = `student_grades_class_${classId}`;
    const studentGrades = await redisClient.get(cacheKey);
    if (studentGrades) {
      return JSON.parse(studentGrades);
    }
    const studentGradesFromDb = await gradeModel.getStudentGradesOfSingleClass(
      classId
    );
    await redisClient.set(
      cacheKey,
      JSON.stringify(studentGradesFromDb),
      'EX',
      3600
    );
    return studentGradesFromDb;
  },
  async getGradeStructuresOfSingleClass(classId) {
    const cacheKey = `grade_structure_class_${classId}`;
    const gradeStructures = await gradeModel.getGradeStructuresOfSingleClass(
      classId
    );
    await redisClient.set(
      cacheKey,
      JSON.stringify(gradeStructures),
      'EX',
      3600
    );
    return gradeStructures;
  },

  async addGradeStructure(IdClass, gradeStructureData) {
    try {
      const newGradeStructureId = await gradeModel.addGradeStructure(
        IdClass,
        gradeStructureData
      );
      await redisClient.del(`grade_structure_class_${IdClass}`);
      console.log(`Cache invalidated for grade_structure_class_${IdClass}`);

      return newGradeStructureId;
    } catch (error) {
      console.error('Error in addGrade:', error);
      throw error;
    }
  },

  async updateGradeStructre(IdGradeStructure, IdClass, gradeStructureData) {
    try {
      await gradeModel.updateGradeStructure(
        IdGradeStructure,
        IdClass,
        gradeStructureData
      );
      await redisClient.del(`grade_structure_class_${IdClass}`);
      console.log(`Cache invalidated for grade_structure_class_${IdClass}`);
    } catch (error) {
      console.error('Error in updateGradeStructure:', error);
      throw error;
    }
  },

  async deleteGradeStructure(IdGrade, IdClass) {
    try {
      await gradeModel.deleteGradeStructure(IdGrade, IdClass);
      await redisClient.del(`grade_structure_class_${IdClass}`);
      console.log(`Cache invalidated for grade_structure_class_${IdClass}`);
    } catch (error) {
      console.error('Error in deleteGradeStructure:', error);
      throw error;
    }
  },

  async addGradeScoreOfStudentInClass(
    IdGradeStructure,
    IdClass,
    IdUser,
    score
  ) {
    return await gradeModel.addGradeScoreOfStudentInClass(
      IdGradeStructure,
      IdClass,
      IdUser,
      score
    );
  },
  async updateGradeScoreOfStudentInClass(
    IdGradeStructure,
    IdClass,
    IdUser,
    score
  ) {
    return await gradeModel.addGradeScoreOfStudentInClass(
      IdGradeStructure,
      IdClass,
      IdUser,
      score
    );
  },
};

module.exports = gradeService;
