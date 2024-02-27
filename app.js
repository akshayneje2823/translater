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

// handling 404 errors
app.use((req, res) => {
  res
    .status(404)
    .json({
      error: "Not Found",
      message: "The requested route does not exist.",
    });
});

// Creating server
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${PORT}`);
});
