const { template } = require("./template");

// TODO: For now this only really supports PR_OPENED event
const PR_OPENED = "pull_request.opened";

module.exports = app => {
  app.log("customizable-comments probot app loaded");

  // app.on("issues.opened", async context => {
  //   const issueComment = context.issue({
  //     body: "Thanks for opening this issue!"
  //   });
  //   return context.github.issues.createComment(issueComment);
  // });

  app.on(PR_OPENED, async context => {
    const { github /*, log, payload*/ } = context;

    const body = await template(context, PR_OPENED);

    const params = context.issue({ body });

    // console.dir({ body });

    return github.issues.createComment(params);
  });
};
