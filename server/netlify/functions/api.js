const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("App is running..");
});

app.use("/.netlify/functions/api", router);
app.use((req, res) => {
  res.send("ok");
});
module.exports.handler = serverless(app);
