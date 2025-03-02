//Class model with database queries
const pool = require('../config/db');

const classModel = {
  getAllClasses: async () => {
    const [rows] = await pool.query('SELECT * FROM Class');
    return rows;
  },

  getClassById: async (IdClass) => {
    const [row] = await pool.query('SELECT * FROM Class WHERE IdClass =?', [
      IdClass,
    ]);
    return row;
  },

  createClass: async (classData) => {
    const { IdUser, name, description } = classData;
    const [result] = await pool.query(
      'INSERT INTO Class (IdUser, name, description) VALUES (?, ?, ?)',
      [IdUser, name, description]
    );
    return result.insertId;
  },

  updateClass: async (IdClass, updatedClass) => {
    console.log('updatedClass', updatedClass);
    const { name, description } = updatedClass;
    const [result] = await pool.query(
      'UPDATE Class SET name =? , description=? WHERE IdClass =?',
      [name, description, IdClass]
    );
    return result.affectedRows;
  },

  deleteClass: async (IdClass) => {
    const [result] = await pool.query('DELETE FROM Class WHERE IdClass =?', [
      IdClass,
    ]);
    return result.affectedRows;
  },
};

module.exports = classModel;
