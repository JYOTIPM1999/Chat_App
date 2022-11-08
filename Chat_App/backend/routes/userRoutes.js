const express = require("express");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "herta.mann@ethereal.email",
    pass: "JWxrjAdBnmgVu84VMT",
  },
});

const {
  registeUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protected } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registeUser).get(protected, allUsers);

router.post("/login", authUser);

// router.get("/github/callback");

router.post("/mail", (req, res) => {
  const { smtpMail, text } = req.body;
  console.log(smtpMail);
  transport
    .sendMail({
      to: smtpMail,
      from: "olin.nolan@ethereal.email",
      subject: "sent email successfully",
      text: text,
    })
    .then(() => {
      // console.log("Email sent successfully");
      res.send("User sent mail successful");
    });
});

module.exports = router;
