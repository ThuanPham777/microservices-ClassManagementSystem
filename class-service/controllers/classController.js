// Handles API requests:

const classService = require('../services/classService');

const classController = {
  getClassListByUserId: async (req, res) => {
    try {
      const {IdUser} = req.params;
      const classes = await classService.getClassListByUserId(IdUser);
      res.status(200).json(classes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getClassById: async (req, res) => {
    try {
      const { IdClass } = req.params;
      console.log(IdClass);
      const classData = await classService.getClassById(IdClass);
      if (classData) {
        res.status(200).json(classData);
      } else {
        res.status(404).json({ error: 'Class not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createClass: async (req, res) => {
    try {
      const newClass = req.body;
      const {IdUser} = req.params
      console.log('IdUser: ' + IdUser);
      const createdClass = await classService.createClass(IdUser , newClass);
      res.status(201).json({
        message: 'Class created successfully',
        class: createdClass,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateClass: async (req, res) => {
    try {
      const { IdClass } = req.params;
      const updatedClass = req.body;
      console.log('updatedClass: ' + updatedClass);
      await classService.updateClass(IdClass, updatedClass);
      res.status(200).json({ message: 'Class updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteClass: async (req, res) => {
    try {
      const { IdClass } = req.params;
      await classService.deleteClass(IdClass);
      res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = classController;
