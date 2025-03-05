const pool = require('../config/db');

const gradeModel = {
  getGradeListByUserId: async (userId) => {
    try {
      const result = await pool.query(
        'SELECT * FROM Grade WHERE IdUser = $1',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching grades:', error);
      throw error;
    }
  },
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

  // cập nhật lại các cột điểm của student trong một class
  updateGradeScoreOfStudentInClass: async (idClass, IdUser, Score) => {
    const result = await pool.query(
      'UPDATE Grade SET score = $1, iduser = $2, updated_at = CURRENT_TIMESTAMP WHERE idclass = $3',
      [Score, IdUser, idClass]
    );
    return result.rows;
  },
};

module.exports = gradeModel;
