/**
 * handler for GCF
 *
 * see: https://github.com/probot/serverless-gcf
 */

const { serverless } = require('@probot/serverless-gcf');
const appFn = require('./app.js');
module.exports = serverless(appFn);
