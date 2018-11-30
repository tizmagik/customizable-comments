const app = require("./app");
const handler = require("./handler");

module.exports = app;
module.exports.probot = handler; // GCF handler
