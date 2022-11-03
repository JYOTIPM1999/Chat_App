const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");
// const {
//   allMessages,
//   sendMessage,
// } = require("../controllers/messageControllers");
const { protected } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protected, sendMessage);
router.route("/:chatId").get(protected, allMessages);

module.exports = router;
