const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const PORT = 4000;

const TOKEN_URL =
  "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";

const OPENSKY_URL =
  "https://opensky-network.org/api/states/all";


let cachedToken = null;
let tokenExpiresAt = 0;


async function getAccessToken() {
  const clientId = process.env.OPENSKY_CLIENT_ID;
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET;

  console.log("Client ID present:", Boolean(clientId));
  console.log("Client Secret present:", Boolean(clientSecret));

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing OPENSKY_CLIENT_ID or OPENSKY_CLIENT_SECRET in .env"
    );
  }

  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const body = new URLSearchParams();

  body.append("grant_type", "client_credentials");
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);

  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const tokenText = await tokenResponse.text();

  console.log("OpenSky token HTTP status:", tokenResponse.status);
  console.log("OpenSky token response:", tokenText);

  if (!tokenResponse.ok) {
    throw new Error(
      `OpenSky authentication failed (${tokenResponse.status}): ${tokenText}`
    );
  }

  let tokenData;

  try {
    tokenData = JSON.parse(tokenText);
  } catch {
    throw new Error(
      "OpenSky returned an invalid token response."
    );
  }

  if (!tokenData.access_token) {
    throw new Error(
      "OpenSky did not return an access token."
    );
  }

  cachedToken = tokenData.access_token;

  tokenExpiresAt =
    Date.now() +
    ((tokenData.expires_in || 300) - 60) * 1000;

  return cachedToken;
}


app.get("/api/opensky/states", async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(OPENSKY_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseText = await response.text();

    console.log("OpenSky states HTTP status:", response.status);
    console.log(
      "OpenSky states response:",
      responseText.slice(0, 1000)
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "OpenSky states request failed.",
        status: response.status,
        details: responseText,
      });
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      return res.status(502).json({
        error: "OpenSky returned invalid JSON.",
      });
    }

    return res.json(data);

  } catch (error) {
    console.error("AeroVision OpenSky backend error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(
    `AeroVision API server running at http://localhost:${PORT}`
  );
});