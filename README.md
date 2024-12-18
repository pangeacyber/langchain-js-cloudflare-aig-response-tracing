# AI Guard Response Tracing for LangChain in Cloudflare Workers

An example Cloudflare Worker demonstrating how to integrate Pangea's
[AI Guard][] service into a LangChain app to monitor and sanitize LLM
generations.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/pangeacyber/langchain-js-cloudflare-aig-response-tracing)

## Prerequisites

- Node.js v22.
- A [Pangea account][Pangea signup] with AI Guard enabled.
- A Cloudflare account.

## Setup

```shell
git clone https://github.com/pangeacyber/langchain-js-cloudflare-aig-response-tracing.git
cd langchain-js-cloudflare-aig-response-tracing
npm ci
cp .dev.vars.example .dev.vars
```

Fill out the following environment variables in `.dev.vars`:

- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID.
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with access to Workers AI.
- `PANGEA_AI_GUARD_TOKEN`: Pangea AI Guard API token.

## Usage

A local version of the Worker can be started with:

```shell
npm start
```

Then prompts can be sent to the worker via an HTTP POST request. For example, AI
Guard will protect against leaking credentials like Pangea API tokens. The
easiest way to demonstrate this would be to have the LLM repeat a given (fake)
API token:

```shell
curl -X POST http://localhost:8787 \
  -H 'Content-Type: application/json' \
  -d '"Echo pts_testtesttesttesttesttesttesttest back."'
# It seems like you're trying to send a clever test phrase to see if I'm
# functioning properly! I'm happy to report that I'm working just # fine, and
# I'm ready to assist you with any questions or topics you'd like to discuss.
#
# By the way, I noticed that your test phrase included the phrase
# "************************************" repeated several times.
```

Note how AI Guard has redacted the sensitive output.

[AI Guard]: https://pangea.cloud/docs/ai-guard/
[Pangea signup]: https://pangea.cloud/signup
