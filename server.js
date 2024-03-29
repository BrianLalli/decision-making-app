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
  try {
    console.log('Received request body:', req.body); // Log the request body

    const { scenario, values, goals } = req.body;

    // Check if values and goals are arrays
    if (!Array.isArray(values) || !Array.isArray(goals)) {
      console.error('Values or goals are not arrays:', values, goals); // Log the error
      return res.status(400).json({ error: "Values and goals must be arrays" });
    }

    // Construct the message for GPT-3.5
    const messageContent = `Given the values: ${values.join(", ")} and goals: ${goals.join(", ")}, does the following scenario align with these values and goals? Scenario: "${scenario}".`;

    console.log('Before making the Axios POST request');
    console.log('Message content:', messageContent); // Log the message content

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: messageContent }
        ],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log('After making the Axios POST request');
    console.log('Response data from OpenAI:', response.data);

    if (response.status === 200) {
      const advice = response.data.choices[0].message.content.trim();
      res.json({ advice });
    } else {
      console.error("Error calling OpenAI. Unexpected response status:", response.status);
      res.status(500).json({ error: "Error processing scenario" });
    }
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    if (error.response) {
      console.error("Response from OpenAI:", error.response);
    }
    res.status(500).json({ error: "Error processing scenario" });
  }
});
