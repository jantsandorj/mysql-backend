const fs = require("fs");
const uuid = require("uuid");
const dataFile = process.cwd() + "/data/product.json";

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
    productName,
    categoryID,
    price,
    thumbImg,
    images,
    discountPercent,
    quantity,
    desc,
    createUser,
  } = req.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, result: readErr });
    }
    const parsedData = JSON.parse(data);
    const newObj = {
      id: uuid.v4(),
      productName,
      categoryID,
      price,
      thumbImg,
      images,
      discountPercent,
      quantity,
      desc,
      createUser,
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
    productName,
    categoryID,
    price,
    thumbImg,
    images,
    discountPercent,
    quantity,
    desc,
    updateUser,
    updateDate,
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
          productName,
          categoryID,
          price,
          thumbImg,
          images,
          discountPercent,
          quantity,
          desc,
          updateDate: Date.now(),
          updateUser: "",
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
