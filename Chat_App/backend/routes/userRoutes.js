const express = require("express");
const { registeUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registeUser);
router.post("/login", authUser);

module.exports = router;
