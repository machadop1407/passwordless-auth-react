const express = require("express");
const app = express();
const cors = require("cors");
const stytch = require("stytch");

app.use(cors());
app.use(express.json());

// USE YOUR OWN PROJECTID AND SECRET
const client = new stytch.Client({
  project_id: "project-test-b7f61938-89e5-47d1-81c9-a1e6ba9293f3",
  secret: "secret-test-S2Cm6zU093ctw9x0_lNyUbZEj0hczE_zazc=",
  env: stytch.envs.test,
});

const authMiddleware = (req, res, next) => {
  const sessionToken = req.headers.sessiontoken;
  client.sessions
    .authenticate({ session_token: sessionToken })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const params = {
    email,
    login_magic_link_url: "http://localhost:3000/auth",
    signup_magic_link_url: "http://localhost:3000/auth",
  };

  const response = await client.magicLinks.email.loginOrCreate(params);

  res.json(response);
});

app.post("/auth", async (req, res) => {
  try {
    const token = req.body.token;
    const sessionToken = await client.magicLinks.authenticate(token, {
      session_duration_minutes: 30,
    });
    res.json(sessionToken);
  } catch (err) {
    res.json(err);
  }
});

app.post("/test", authMiddleware, (req, res) => {
  res.json("IT WORKED, THIS USER IS AUTHENTICATED");
});

app.listen(3002, () => {
  console.log("SERVER is running!");
});
