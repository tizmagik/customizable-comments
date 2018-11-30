const getConfig = require("./config");
const get = require("lodash.get");

const BRANCH = "$BRANCH";

const injectVars = (vars, template) => {
  let newTemplate = template;
  vars.forEach(({ name, value }) => {
    newTemplate = newTemplate.replace(new RegExp(`\\${name}`, "g"), value);
  });
  return newTemplate;
};

const template = async (context, event) => {
  // get config
  const config = await getConfig(context);
  let templ = get(config, `${event}.template`, "");

  const branchName = context.payload.pull_request.head.ref;

  const vars = config.vars || [];
  vars.push({ name: BRANCH, value: branchName });

  templ = injectVars(vars, templ);

  return templ;
};

module.exports = {
  template
};
