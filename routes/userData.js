const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

router.get("/users", user.getAll);
router.get("/user", user.getOne);
router.post("/user", user.create);
router.delete("/user/:id", user.delete);
router.put("/user/:id", user.update);
// router.post("/user/login", user.login);

module.exports = router;
