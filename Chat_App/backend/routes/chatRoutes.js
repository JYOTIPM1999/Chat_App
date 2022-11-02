const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const { protected } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protected, accessChat);
router.route("/").get(protected, fetchChats);
router.route("/group").post(protected, createGroupChat);
router.route("/rename").put(protected, renameGroup);
router.route("/groupadd").put(protected, addToGroup);
router.route("/groupremove").put(protected, removeFromGroup);

module.exports = router;
