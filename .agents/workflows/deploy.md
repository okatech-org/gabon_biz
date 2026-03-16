---
description: Deploy GABON BIZ to production (gabon-biz.web.app)
---

# Deploy GABON BIZ to Production

// turbo-all

## Steps

1. Build Docker image and deploy to Cloud Run:

```bash
pnpm run deploy:cloudrun
```

This builds the Next.js app via Docker on Google Cloud Build, pushes the image to `gcr.io/gabon-biz/gabon-biz-web`, and deploys it to Cloud Run in `europe-west1`.

2. Deploy Firebase Hosting (proxies gabon-biz.web.app to Cloud Run):

```bash
pnpm run deploy:firebase
```

3. Verify the deployment by opening https://gabon-biz.web.app/ in the browser.

## Notes

- The Firebase project is `gabon-biz`. Do **NOT** deploy to `digitalium-ga` or any other project.
- The app uses Next.js `standalone` output mode, served by Cloud Run.
- Firebase Hosting acts as a reverse proxy, routing all traffic to the Cloud Run service.
- The `deploy:cloudrun` script automatically reads `OPENAI_API_KEY` from `apps/web/.env.local` and passes it to Cloud Run.

4. Verify env vars are set (optional):

```bash
gcloud run services describe gabon-biz-web --region europe-west1 --project gabon-biz --format='get(spec.template.spec.containers[0].env)'
```
