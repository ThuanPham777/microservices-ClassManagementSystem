const gradeModel = require('../models/gradeModel');
const redisClient = require('../config/redis');

const gradeService = {
  async getGradeListByUserId(userId){
    const cacheKey = `grades_list_${userId}`;

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log('Data found in cache!');
        return JSON.parse(cachedData);
      }

      console.log('Data not found in cache. Querying from database...');
      const grades = await gradeModel.getGradeListByUserId(userId);

      await redisClient.set(cacheKey, JSON.stringify(grades), 'EX', 3600);
      console.log('Data saved to cache!');

      return grades;
    } catch (error) {
      console.error('Error in getAllGradesOfSingleClassByTeacher:', error);
      throw error;
    }
  },
  async getAllGradesOfSingleClassByTeacher(IdClass) {
    const cacheKey = `grades_class_${IdClass}`;

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log('Data found in cache!');
        return JSON.parse(cachedData);
      }

      console.log('Data not found in cache. Querying from database...');
      const grades = await gradeModel.getAllGradesOfSingleClassByTeacher(IdClass);

      await redisClient.set(cacheKey, JSON.stringify(grades), 'EX', 3600);
      console.log('Data saved to cache!');

      return grades;
    } catch (error) {
      console.error('Error in getAllGradesOfSingleClassByTeacher:', error);
      throw error;
    }
  },

  async addGrade(IdClass, gradeData) {
    try {
      const newGradeId = await gradeModel.addGrade(IdClass, gradeData);
      await redisClient.del(`grades_class_${IdClass}`);
      console.log(`Cache invalidated for grades_class_${IdClass}`);

      return newGradeId;
    } catch (error) {
      console.error('Error in addGrade:', error);
      throw error;
    }
  },

  async updateGradeScoreOfStudentInClass(IdClass, IdUser, score) {
    return await gradeModel.updateGradeScoreOfStudentInClass(
      IdClass,
      IdUser,
      score
    );
  },
};

module.exports = gradeService;