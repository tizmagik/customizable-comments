const probotConfig = require("probot-config");

const CONFIG_NAME = "customizable-comments.yml";

const getConfig = async context => {
  const defaultConfig = {};

  const config = (await probotConfig(context, CONFIG_NAME)) || defaultConfig;

  return config;
};

module.exports = getConfig;
