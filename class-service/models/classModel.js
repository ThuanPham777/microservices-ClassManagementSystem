//Class model with database queries
const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const classModel = {
  getClassListByUserId: async (userId) => {
    const [rows] = await pool.query(
      `SELECT Class.*
       FROM Class
       JOIN ClassUser ON Class.IdClass = ClassUser.IdClass
       WHERE ClassUser.IdUser = ?`,
      [userId]
    );
    return rows;
  },

  getClassById: async (IdClass) => {
    const [row] = await pool.query('SELECT * FROM Class WHERE IdClass =?', [
      IdClass,
    ]);
    return row;
  },

  createClass: async (userId, classData) => {
    const { name, description } = classData;
    const IdClass = uuidv4();
    const [result] = await pool.query(
      'INSERT INTO Class (IdClass, name, description) VALUES (?, ?, ?)',
      [IdClass, name, description]
    );

    // Insert ClassUser record
    const IdClassUser = uuidv4();
    await pool.query(
      'INSERT INTO ClassUser (IdClassUser, IdUser, IdClass) VALUES (?, ?, ?)',
      [IdClassUser, userId, IdClass]
    );

    return IdClass;
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
