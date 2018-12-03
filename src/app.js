const { template } = require("./template");

// TODO: For now this only really supports PR_OPENED event
const PR_OPENED = "pull_request.opened";

module.exports = app => {
  app.log("customizable-comments probot app loaded");

  app.on(PR_OPENED, async context => {
    const { github } = context;

    const body = await template(context, PR_OPENED);

    if (!body) return;

    const params = context.issue({ body });

    return github.issues.createComment(params);
  });
};
