const prOpened = require('./fixtures/pull_request.opened.json');

jest.setMock('probot-config', () => {
  return Promise.resolve({
    vars: [
      {
        name: '$BRANCH_SUFFIX',
        value: '(test-suffix)'
      }
    ],
    pull_request: {
      opened: {
        template: `
    Here's a helpful URL based on the branch name: https://$BRANCH-$BRANCH_SUFFIX.something.example.com
    Second line goes here. 
    BRANCH is: $BRANCH
    BRANCH_SUFFIX is: $BRANCH_SUFFIX
    BRANCH_SANITIZED is: $BRANCH_SANITIZED
    Done.
        `
      }
    }
  });
});

describe('template', () => {
  const { template } = require('../template');
  it('stuff', async done => {
    const compiled = await template(prOpened, 'pull_request.opened');
    expect(compiled).toMatchSnapshot();
    done();
  });
});
