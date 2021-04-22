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
    console.log(process.env.WEBHOOK_SECRET);
    const mock = nock("https://api.github.com")
      .get(
        "/repos/tizmagik/testing-pr-opened/contents/.github%2Fcustomizable-comments.yml"
      )
      .reply(200, {
        pull_request: {
          opened: {
            template: "test",
          },
        },
      });

    const mock2 = nock("https://api.github.com").post(/.*/, (requestBody) => {
      console.log({ requestBody });
      return true;
    });

    // const mock2 = nock("https://api.github.com")
    //   // create new check run
    //   .post(
    //     "/repos/tizmagik/testing-pr-opened/contents/.github%2Fcustomizable-comments.yml",
    //     (requestBody) => {
    //       console.log("in post", requestBody);
    //       expect(requestBody).toEqual({ body: "Hello, World!" });

    //       return true;
    //     }
    //   )
    //   .reply(201, {});

    await probot.receive(require("./fixtures/pull_request.opened.json"));

    // expect(mock2.activeMocks()).toEqual([]);
  });
});
