const express = require("express");
const router = express.Router();
const products = require("../controllers/product.controller");

router.get("/products", products.getAll);
router.post("/products", products.create);
router.delete("/products/:id", products.delete);
router.put("/products/:id", products.update);

module.exports = router;
