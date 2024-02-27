const express = require("express");
const dotenv = require("dotenv");
const routes = require("./route");
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// read the data (req.body) in json format
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("<h1>Node Server</h1>");
});
app.use("/", routes);


// Creating server
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app