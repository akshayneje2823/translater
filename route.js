const express = require('express')
const router= express.Router()
var translate = require("@vitalets/google-translate-api").translate
// Translate to french API
const language = "fr";
router.post("/translate", async (req, res) => {
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
module.exports = router