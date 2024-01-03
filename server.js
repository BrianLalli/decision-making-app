require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/analyze-scenario", async (req, res) => {
  const { scenario, values, goals } = req.body;

  // Construct the prompt for GPT-3.5
  const prompt = `Given the values: ${values.join(
    ", "
  )} and goals: ${goals.join(
    ", "
  )}, does the following scenario align with these values and goals? Scenario: "${scenario}".`;

  try {
    console.log('Before making the Axios POST request'); // Add this line

    const response = await axios.post(
      "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
      {
        prompt: prompt,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log('After making the Axios POST request'); // Add this line

    if (response.status === 200) {
      const advice = response.data.choices[0].text.trim();
      res.json({ advice });
    } else {
      console.error(
        "Error calling OpenAI. Unexpected response status:",
        response.status
      );
      res.status(500).json({ error: "Error processing scenario" });
    }
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Error processing scenario" });
  }
});
