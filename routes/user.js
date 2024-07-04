const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
router.get(
  "/get",
  require("../controllers/User/get").process
);
router.post("/signup", require("../controllers/User/signup").process);
router.post("/login", require("../controllers/User/login").process);
module.exports = router;
