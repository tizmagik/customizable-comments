const nock = require("nock");
nock.disableNetConnect();

const { Probot, ProbotOctokit } = require("probot");

const app = require("../app");

describe("app", () => {
  /** @type {import('probot').Probot */
  let probot;
  beforeEach(() => {
    probot = new Probot({
      // simple authentication as alternative to appId/privateKey
      githubToken: "test",
      // disable logs
      logLevel: "warn",
      // disable request throttling and retries
      Octokit: ProbotOctokit.defaults({
        throttle: { enabled: false },
        retry: { enabled: false },
      }),
    });
    probot.load(app);
  });

  it("recieves pull_request.opened event", async function () {
    const mock = nock("https://api.github.com")
      .get("/repos/tizmagik/test/contents/.github%2Fcustomizable-comments.yml")
      .reply(
        200,
        JSON.stringify({
          pull_request: {
            opened: {
              template: `Here's a helpful URL based on the branch name: https://$BRANCH-$BRANCH_SUFFIX.something.example.com
Second line goes here.
BRANCH is: $BRANCH
BRANCH_SUFFIX is: $BRANCH_SUFFIX
Done.`,
            },
          },
        })
      )
      .post("/repos/tizmagik/test/issues/3/comments", (requestBody) => {
        expect(requestBody).toMatchSnapshot();

        return true;
      })
      .reply(200);

    await probot.receive(require("./fixtures/real.json"));

    expect(mock.activeMocks()).toEqual([]);
  });
});
