const pool = require("../config/mysqlconfig");

exports.getUsers = async (limit) => {
  try {
    if (limit) {
      const [rows] = await pool.query(`select * from user_data limit ${limit}`);
      return rows;
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getUser = async (id) => {
  try {
    const [rows] = await pool.query(`select * from user_data limit ${limit}`);
    return rows;
  } catch (err) {
    console.log(err);
  }
};
exports.createUser = async (
  first_name,
  last_name,
  password,
  email,
  birth_date
) => {
  //this question marks are similar with C language => printf('%d %d', x,y)
  const [result] = await pool.query(
    `INSERT INTO user_data VALUES (?, ?, ?, ?, ?, ?)`,
    [null, first_name, last_name, password, email, birth_date]
  );
  return result;
};
exports.updateUser = async (id, updatedData) => {
  for (let i = 0; i < Object.keys(updatedData).length; i++) {
    result = await pool.query(
      `UPDATE user_data SET ${Object.keys(updatedData)[i]} = '${
        Object.values(updatedData)[i]
      }'  WHERE user_id = ${id}`
    );
  }
  return result;
};
exports.deleteUser = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM user_data WHERE user_id=${id}`
  );
  return result;
};
