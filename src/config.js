const CONFIG_NAME = 'customizable-comments.yml';

/*

pull_request:
  opened:
    template: |
      Here's a helpful URL based on the branch name: https://$BRANCH-$BRANCH_SUFFIX.something.example.com
      Second line goes here.
      BRANCH is: $BRANCH
      BRANCH_SUFFIX is: $BRANCH_SUFFIX
      Done.

*/

const getConfig = async (context) => {
  const defaultConfig = {
    pull_request: {
      opened: {
        template: `_You have succesfully installed probot-cc, now please create a \`.github/${CONFIG_NAME}\` file in your repository to customize this message._`
      }
    }
  };

  return context.config(CONFIG_NAME, defaultConfig);
};

module.exports = getConfig;
