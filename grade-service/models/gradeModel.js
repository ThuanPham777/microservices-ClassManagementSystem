const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const gradeModel = {
  getStudentGradesOfSingleClass: async (classId) => {
    try {
      const result = await pool.query(
        'SELECT * FROM StudentGrade JOIN GradeStructure on StudentGrade.IdGradeStructure = GradeStructure.IdGradeStructure WHERE IdClass = $1',
        [classId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching grades:', error);
      throw error;
    }
  },

  getGradeStructuresOfSingleClass: async (classId) => {
    try {
      const result = await pool.query(
        'SELECT * FROM GradeStructure WHERE IdClass = $1',
        [classId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching grade structure:', error);
      throw error;
    }
  },
  // Thêm cột điểm thành phần
  addGradeStructure: async (IdClass, gradeStructureData) => {
    const { name, percentage } = gradeStructureData;
    const IdGradeStructure = uuidv4().toString();
    const result = await pool.query(
      'INSERT INTO GradeStructure (IdGradeStructure, name, percentage, IdClass) VALUES ($1, $2, $3, $4)',
      [IdGradeStructure, name, percentage, IdClass]
    );
    return result.rows;
  },

  // cập nhật cột điểm thành phần
  updateGradeStructure: async (
    IdGradeStructure,
    IdClass,
    gradeStructureData
  ) => {
    const { name, percentage } = gradeStructureData;
    const result = await pool.query(
      'UPDATE GradeStructure SET name = $1, percentage = $2 WHERE idclass = $3 and idgradestructure = $4',
      [name, percentage, IdClass, IdGradeStructure]
    );
    return result.rows;
  },

  // xóa cột điểm thành phần
  deleteGradeStructure: async (IdGradeStructure, IdClass) => {
    const result = await pool.query(
      'DELETE FROM GradeStructure WHERE idclass = $1 and idgradestructure = $2',
      [IdClass, IdGradeStructure]
    );
    return result.rows;
  },

  // thêm các cột điểm của student trong một class
  addGradeScoreOfStudentInClass: async (
    IdGradeStructure,
    IdClass,
    IdUser,
    Score
  ) => {
    const IdStudentGrade = uuidv4().toString();
    const result = await pool.query(
      'INSERT INTO StudentGrade (idgradestructure, idclass, iduser, score) VALUES ($1, $2, $3, $4, $5)',
      [IdStudentGrade, IdGradeStructure, IdClass, IdUser, Score]
    );
    return result.rows;
  },
  // cập nhật điểm của student trong một class
  updateGradeScoreOfStudentInClass: async (
    IdStudentGrade,
    IdClass,
    IdUser,
    Score
  ) => {
    const result = await pool.query(
      'UPDATE StudentGrade SET score = $1, updated_at = CURRENT_TIMESTAMP WHERE idclass = $2 and iduser = $3 and idstudentgrade = $4',
      [Score, IdClass, IdUser, IdStudentGrade]
    );
    return result.rows;
  },
};

module.exports = gradeModel;
