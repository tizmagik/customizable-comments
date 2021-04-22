const app = require('./app');
// const handler = require('./handler');

module.exports = app;
// TODO(tizmagik): Apr 22, 2021: Disabling for now as it looks like probot core will support serverless out of the box,
// see: https://github.com/probot/serverless-gcf/issues/17
// module.exports.probot = handler; // GCF handler
