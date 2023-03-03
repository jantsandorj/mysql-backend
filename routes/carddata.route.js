const express = require("express");
const router = express.Router();
const carddata = require("../controllers/cardController");

router.get("/carddata", carddata.getAll);
router.post("/carddata", carddata.create);
router.delete("/carddata/:id", carddata.delete);
router.put("/carddata", carddata.update);

module.exports = router;
