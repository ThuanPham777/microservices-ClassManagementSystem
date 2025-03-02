const pool = require('../config/db');

const gradeModel = {
  getAllGradesOfSingleClassByTeacher: async (IdClass) => {
    try {
      const result = await pool.query(
        'SELECT * FROM Grade WHERE IdClass = $1',
        [IdClass]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching grades:', error);
      throw error;
    }
  },

  addGrade: async (IdClass, gradeData) => {
    const { name, percentage } = gradeData;
    const result = await pool.query(
      'INSERT INTO Grade (name, percentage, IdClass) VALUES ($1, $2, $3)',
      [name, percentage, IdClass]
    );
    return result.rows;
  },
};

module.exports = gradeModel;
