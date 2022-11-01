const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");

const app = express();
dotenv.config();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req, res) => res.send("hello express"));

app.get("/api/chat", (req, res) => res.send(chats));

app.get("/api/chat/:id", (req, res) => {
  //   console.log(req.params.id);
  const singleChat = chats.find((el) => el._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`server started on port ${PORT}`);
});
