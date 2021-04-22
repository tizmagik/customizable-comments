const { template } = require("./template");

// TODO: For now this only really supports PR_OPENED event
const PR_OPENED = "pull_request.opened";

module.exports = (app) => {
  app.log("customizable-comments probot app loaded");

  app.on(PR_OPENED, async (context) => {
    app.log("got PR open event", context);
    console.log("got PR open event", context.issue(), context);

    /** @type {import('probot').Context */
    const { octokit, issue } = context;

    const body = await template(context, PR_OPENED);

    console.log("body is", { body });

    if (!body) return;

    const params = issue({ body });

    return octokit.issues.createComment(params);
  });
};
