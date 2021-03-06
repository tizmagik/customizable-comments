# customizable-comments (probot-cc)

A GitHub App built with [Probot](https://github.com/probot/probot) that auto-replies with customizable comments based on template vars

<img src="./public/probot-cc-sample.png" />

## Usage

1. Install the [Customizable Comments (probot-cc) GitHub App](https://github.com/apps/probot-cc) into the repo(s) you wish to use it on.
1. Add a `.github/customizable-comments.yml` configuration file to each repo.

## Configuration options

_📒 Currently, this Probot App only supports `pull_request.opened` events. I would be happy to add more, just submit a PR or Issue with what you'd find useful._

### Built-in template vars

| name               | value                                                                                                            | used when      |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------- |
| \$BRANCH           | The branch name of the PR                                                                                        | `pull_request` |
| \$BRANCH_SANITIZED | The branch name of the PR but sanitized as safe for URL prefixes (lowercased, `.` and `/` are replaced with `-`) | `pull_request` |

### Custom template vars

You can configure your own variable replacements using the `vars:` block in the yml file. See the example below:

## Example

```yaml
vars:
  - name: $MY_CUSTOM
    value: my-value

pull_request:
  opened:
    template: |
      Here's a helpful URL based on the branch name: https://$BRANCH.something.example.com
      And here's my custom value: $MY_CUSTOM
```

The above will auto-reply with a comment like so:

```
Here's a helpful URL based on the branch name: https://the-branch.something.example.com
And here's my custom value: my-custom
```

## Local Development

```sh
# Install dependencies
npm install

# Run the bot
npm run dev
```

## Rather host yourself?

Feel free to host this app yourself "on-prem" if you like. It should support Lambda or Google Cloud Functions with minimal fuss:

### Deploying as GCF ☁️

> Note: This is currently disabled in the code, since I'm deploying to Vercel for public use, but can be re-enabled easily if you're self-hosting.

This Probot app supports deploying as a Google Cloud Function out of the box:

```
gcloud beta functions deploy gcf-name --env-vars-file .env.yaml --entry-point probot --runtime nodejs8 --trigger-http
```

Where:

- `gcf-name`: desired name of the GCF
- `.env.yaml`: see [.env.yaml.example](./.env.yaml.example)

See [Probot Deployment docs](https://probot.github.io/docs/deployment/) for other deployment options.

## Contributing

If you have suggestions for how customizable-comments could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Jeremy Gayed <https://twitter.com/tizmagik>
