const classModel = require('../models/classModel');
const redisClient = require('../config/redis');

const classService = {
  async getClassListByUserId(userId) {
    const cacheKey = `classes_by_user_${userId}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Data found in cache!');
      return JSON.parse(cachedData);
    }
    console.log('Data not found in cache. Querying from database...');
    const classes = await classModel.getClassListByUserId(userId);
    await redisClient.set(cacheKey, JSON.stringify(classes), 'EX', 3600);
    console.log('Data saved to cache!');
    return classes;
  },

  async getClassById(IdClass) {
    const cacheKey = `class_${IdClass}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Data found in cache!');
      return JSON.parse(cachedData);
    }
    console.log('Data not found in cache. Querying from database...');
    const classData = await classModel.getClassById(IdClass);

    if (classData) {
      await redisClient.set(cacheKey, JSON.stringify(classData), 'EX', 3600);
      console.log('Data saved to cache!');
    }

    return classData;
  },

  async createClass(newClass) {
    const createdClass = await classModel.createClass(newClass);
    await redisClient.del('all_classes');
    console.log('Cache invalidated for all_classes');

    return createdClass;
  },

  async updateClass(IdClass, updatedClass) {
    const result = await classModel.updateClass(IdClass, updatedClass);

    await redisClient.del(`class_${IdClass}`);
    await redisClient.del('all_classes');
    console.log(`Cache invalidated for class_${IdClass} and all_classes`);

    return result;
  },

  async deleteClass(IdClass) {
    const result = await classModel.deleteClass(IdClass);

    await redisClient.del(`class_${IdClass}`);
    await redisClient.del('all_classes');
    console.log(`Cache invalidated for class_${IdClass} and all_classes`);

    return result;
  },
};

module.exports = classService;
