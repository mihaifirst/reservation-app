const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3333;

app.use(cors());

app.get("/api/structure", (req, res) => {
  res.sendFile(path.join(__dirname, "./assets/structure.json"));
});

app.listen(port, () => {
  console.log(`Serverul ruleaza la portul: ${port}`);
});
