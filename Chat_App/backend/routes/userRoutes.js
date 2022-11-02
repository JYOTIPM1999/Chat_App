const express = require("express");
const {
  registeUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protected } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registeUser).get(protected, allUsers);

router.post("/login", authUser);

module.exports = router;
