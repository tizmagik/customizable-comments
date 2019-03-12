const { Application } = require("probot");
const bot = require("../");
const payload = require("./fixtures/pull_request.opened.json");

jest.mock("probot-config");

describe("probot-cc", () => {
  let app;
  let github;

  beforeEach(() => {
    app = new Application();
    app.load(bot);
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve())
      }
    };
    app.auth = () => Promise.resolve(github);
  });

  describe("on pull_request.opened", () => {
    it("creates comment with preview sandbox helpers", async () => {
      await app.receive(payload);

      expect(github.issues.createComment).toHaveBeenCalled();
      expect(github.issues.createComment.mock.calls[0][0]).toMatchSnapshot();
    });
  });
});
