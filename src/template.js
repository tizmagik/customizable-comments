const getConfig = require("./config");
const get = require("lodash.get");

const BRANCH = "$BRANCH";
const BRANCH_SANITIZED = "$BRANCH_SANITIZED";

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
  const branchNameSanitized = context.payload.pull_request.head.ref
    .replace(/[\/|\.]/g, "-")
    .toLowerCase();

  const vars = config.vars || [];
  // order matters here because $BRANCH replacement would override $BRANCH_SANITIZED
  vars.push({ name: BRANCH_SANITIZED, value: branchNameSanitized });
  vars.push({ name: BRANCH, value: branchName });

  templ = injectVars(vars, templ);

  return templ;
};

module.exports = {
  template
};
