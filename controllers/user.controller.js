const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;
const userService = require("../model/user-service");

exports.getAll = async (req, res) => {
  const { limit } = req.query;
  try {
    const result = await userService.getUsers(limit);
    if (result.length > 0) {
      res.json({ status: true, result });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};
exports.getOne = async (res, req) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ status: false, message: "user id not found" });
  }
  try {
    const result = await userService.getUser(id);
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.create = async (res, req) => {
  const { first_name, last_name, password, email, birth_date } = req.body;
  const newobj = {
    first_name,
    last_name,
    password,
    email,
    birth_date,
  };
  try {
    const result = await userService.createUser(newobj);
    console.log(result);
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ status: false, message: "err" });
  }
  try {
    const result = await userService.updateUser(id, req.body);
    console.log(result);

    if (result && result[0].affectedRows > 0) {
      res.json({ status: true, result });
    }
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ status: false, message: "err" });
  }
  try {
    const result = await userService.deleteUser(id);
    console.log(result);
    if (result && result.affectedRows > 0) {
      res.json({ status: true, result });
    }
  } catch (err) {
    res.json({ status: false, message: err });
  }
};
