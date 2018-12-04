const { createProbot } = require("probot");
const appFn = require("./app");

const loadProbot = appFn => {
  const probot = createProbot({
    id: process.env.APP_ID,
    secret: process.env.WEBHOOK_SECRET,
    cert: Buffer.from(process.env.PRIVATE_KEY, "base64")
  });

  probot.load(appFn);

  return probot;
};

module.exports = (req, res) => {
  const probot = loadProbot(appFn);
  return probot.server(req, res);
};
