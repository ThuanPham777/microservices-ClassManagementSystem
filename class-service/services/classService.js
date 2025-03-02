// Handles business logic:
const classModel = require('../models/classModel');

const classService = {
  // Method to get all classes
  async getAllClasses() {
    return await classModel.getAllClasses();
  },

  async getClassById(IdClass) {
    return await classModel.getClassById(IdClass);
  },

  async createClass(newClass) {
    return await classModel.createClass(newClass);
  },

  async updateClass(IdClass, updatedClass) {
    return await classModel.updateClass(IdClass, updatedClass);
  },

  async deleteClass(IdClass) {
    return await classModel.deleteClass(IdClass);
  },
};

module.exports = classService;
