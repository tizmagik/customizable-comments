const { createNodeMiddleware, createProbot } = require('probot');
const app = require('../../../src/app');

const probot = createProbot({
  defaults: {
    webhookPath: '/api/github/webhooks'
  }
});

module.exports = createNodeMiddleware(app, { probot });
