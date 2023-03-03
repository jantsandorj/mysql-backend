const fs = require("fs");
const uuid = require("uuid");
const dataFile = process.cwd() + "/data/user.json";
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

exports.getAll = (req, res) => {
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, result: readErr });
    }
    const savedData = JSON.parse(data);
    return res.json({ status: true, result: savedData });
  });
};

exports.create = (req, res) => {
  const {
    firstName,
    lastName,
    password,
    email,
    favProduct,
    mostVisitedProduct,
  } = req.body;
  fs.readFile(dataFile, "utf-8", async (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, result: readErr });
    }
    const encryptPassword = await bcrypt.hash(password, saltRounds);
    const parsedData = JSON.parse(data);
    const newObj = {
      id: uuid.v4(),
      firstName,
      lastName,
      password: encryptPassword,
      email,
      favProduct,
      mostVisitedProduct,
      createDate: Date.now(),
    };
    parsedData.push(newObj);
    fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, result: writeErr });
      }
      return res.json({ status: true, result: parsedData });
    });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const {
    firstName,
    lastName,
    password,
    email,
    favProduct,
    mostVisitedProduct,
    updateUser,
  } = req.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, result: readErr });
    }
    const parsedData = JSON.parse(data);
    const updateData = parsedData.map((e) => {
      if (e.id == id) {
        return {
          ...e,
          firstName,
          lastName,
          password,
          email,
          favProduct,
          mostVisitedProduct,
          updateUser,
          updateDate: Date.now(),
          updateUser,
        };
      } else {
        return e;
      }
    });
    fs.writeFile(dataFile, JSON.stringify(updateData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, result: writeErr });
      }
      return res.json({ status: true, result: updateData });
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, result: readErr });
    }
    const parsedData = JSON.parse(data);
    const deleteData = parsedData.filter((e) => e.id != id);
    fs.writeFile(dataFile, JSON.stringify(deleteData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, result: writeErr });
      }
      return res.json({ status: true, result: deleteData });
    });
  });
};
exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log(id);
  if (!username || !password) {
    return res.json({ status: false, message: "ner pass aldaatai" });
  }
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, result: readErr });
    }
    const parsedData = JSON.parse(data);
    const user = parsedData.map(async (e) => {
      if (email == e.email) {
        const decrypt = await bcrypt.compare(password, e.password);
        if (decrypt) {
          return {
            username: e.username,
            id: e.id,
            lastName: e.lastName,
            firstName: e.firstName,
          };
        }
      }
    });
    if (user.lenght > 0) {
      return res.json({
        status: true,
        result: user,
      });
    } else {
      return response.json({
        status: false,
        message: "tanii email esvel password buruu bn",
      });
    }
  });
};
