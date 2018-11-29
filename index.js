module.exports = app => {
  // Your code here
  app.log("Yay, the app was loaded!");

  app.on("issues.opened", async context => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!"
    });
    return context.github.issues.createComment(issueComment);
  });

  app.on("pull_request.opened", async context => {
    // const config = await context.config(`auto-comment.yml`);
    // const { pullRequestOpened } = config || {};

    const params = context.issue({ body: "Thanks for opening this PR!" });

    // Post a comment on the issue
    return context.github.issues.createComment(params);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
