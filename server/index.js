const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/", (req, res) => {
  res.send({ message: "testing purpose" });
});
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/noteslist", require("./routes/notesListRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server Listening on PORT: http://localhost:" + PORT);
});
