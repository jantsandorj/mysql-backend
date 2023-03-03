const express = require("express");
const router = express.Router();
const product = require("../controllers/product.category");

router.get("/productCat", product.getAll);
router.post("/productCat", product.create);
router.delete("/productCat/:id", product.delete);
router.put("/productCat", product.update);

module.exports = router;
