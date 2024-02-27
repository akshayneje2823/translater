import express from "express";
import { translate } from "@vitalets/google-translate-api";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// read the data (req.body) in json format
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("<h1>Node Server</h1>");
});

// Translate to french API
const language = "fr";

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text)
      res
        .status(400)
        .json({ error: "Invalid Parameters..! Text cannot be null or empty" });

    // passing parameters the function to translate the text, can edit for more functionalities
    const translation = await translate(text, { to: language });
    res.status(200).json({ success: true, translation: translation.text });
  } catch (error) {
    if (error.name === "ApiError") {
      return res.status(500).json({ success: false, error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Creating server
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${PORT}`);
});
