# Outreach click tracking

Small Vercel redirect endpoint for outreach links.

## Deploy

```sh
npx vercel@latest --prod --yes tracking
```

The endpoint redirects from:

```txt
https://<deployment>/c?c=<campaign>&s=<slug>&u=<encoded-target-url>
```

Only `https://ryutarote.github.io/web-renewal-studio/...` targets are allowed.

## Logs

Each click writes one JSON line to the Vercel function log:

```json
{"event":"outreach_click","ts":"...","campaign":"followup_20260702","slug":"...","target":"..."}
```

Use Vercel's project logs to inspect click events.
