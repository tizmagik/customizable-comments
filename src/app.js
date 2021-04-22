const { template } = require("./template");

// TODO: For now this only really supports PR_OPENED event
const PR_OPENED = "pull_request.opened";

module.exports = (/** @type { import('probot').Probot } */ app) => {
  app.log("customizable-comments probot app loaded");

  app.on(PR_OPENED, async (context) => {
    console.log(
      "got PR open event",
      context.issue({}),
      context.pullRequest({})
    );

    const body = await template(context, PR_OPENED);

    console.log("body is", { body });

    if (!body) {
      console.log("No template found, exiting...", context.issue({}));
      return;
    }

    const params = context.issue({ body });

    return context.octokit.issues.createComment(params);
  });
};
