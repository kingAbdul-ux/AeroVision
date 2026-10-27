require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const PORT = 4000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const OPEN_SKY_CLIENT_ID =
  process.env.OPENSKY_CLIENT_ID;

const OPEN_SKY_CLIENT_SECRET =
  process.env.OPENSKY_CLIENT_SECRET;

app.get("/api/opensky/states", async (req, res) => {
  try {
    const response = await axios.get(
      "https://opensky-network.org/api/states/all",
      {
        auth: {
          username: OPEN_SKY_CLIENT_ID,
          password: OPEN_SKY_CLIENT_SECRET,
        },
        timeout: 15000,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "OpenSky request failed:",
      error.response?.data || error.message
    );

    res.status(
      error.response?.status || 500
    ).json({
      error: "Unable to fetch OpenSky aircraft data.",
      message:
        error.response?.data?.message ||
        error.message,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AeroVision API",
  });
});

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `AeroVision API server running on port ${PORT}`
    );

    console.log(
      `Local: http://localhost:${PORT}`
    );

    console.log(
      `Network: http://192.168.100.152:${PORT}`
    );
  }
);