const fs = require("fs");
const uuid = require("uuid");
const dataFile = process.cwd() + "/data/admincategory.json";

exports.getAll = (req, res) => {
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }
    const savedData = JSON.parse(data);
    return res.json({ status: true, message: savedData });
  });
};

exports.create = (req, res) => {
  const { categoryName, link, position, iconImg } = req.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }
    const parsedData = JSON.parse(data);
    const newObj = { id: uuid.v4(), categoryName, link, position, iconImg };
    parsedData.push(newObj);
    fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, message: writeErr });
      }
      return res.json({ status: true, message: parsedData });
    });
  });
};

exports.update = (req, res) => {
  const { id, categoryName, link, position, iconName } = req.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }
    const parsedData = JSON.parse(data);
    const updateData = parsedData.map((e) => {
      if (e.id == id) {
        return { ...e, categoryName, position, link, iconName };
      } else {
        return e;
      }
    });
    fs.writeFile(dataFile, JSON.stringify(updateData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, message: writeErr });
      }
      return res.json({ status: true, message: updateData });
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }
    const parsedData = JSON.parse(data);
    const deleteData = parsedData.filter((e) => e.id != id);
    fs.writeFile(dataFile, JSON.stringify(deleteData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, message: writeErr });
      }
      return res.json({ status: true, message: deleteData });
    });
  });
};
