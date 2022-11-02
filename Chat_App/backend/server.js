const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("hello express"));

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

//////
const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`server started on port ${PORT}`);
});
