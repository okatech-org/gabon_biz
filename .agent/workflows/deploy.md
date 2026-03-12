---
description: Deploy GABON BIZ to production (gabon-biz.web.app)
---

# Deploy GABON BIZ to Production

> **CRITICAL**: The GCP project for this app is `gabon-biz` (NOT `digitalium-ga`).
> The Cloud Run service URL is `gabon-biz-web-566340162558.europe-west1.run.app`.
> The Firebase Hosting domain is `gabon-biz.web.app`.

## Steps

1. Run the local build to catch errors early
   // turbo

```bash
cd /Users/okatech/okatech-projects/Digital\ GABON/MIN_ECO_NUM/gabon_biz && pnpm --filter web build
```

2. Commit and push all changes to git

```bash
cd /Users/okatech/okatech-projects/Digital\ GABON/MIN_ECO_NUM/gabon_biz && git add -A && git commit -m "<message>" && git push origin main
```

3. Build and push Docker image to Artifact Registry on **project gabon-biz**

```bash
cd /Users/okatech/okatech-projects/Digital\ GABON/MIN_ECO_NUM/gabon_biz/apps/web && gcloud builds submit --tag europe-west1-docker.pkg.dev/gabon-biz/cloud-run-source-deploy/gabon-biz-web --timeout=1200 --region=europe-west1 --project=gabon-biz
```

4. Deploy to Cloud Run on **project gabon-biz**

```bash
gcloud run deploy gabon-biz-web --image=europe-west1-docker.pkg.dev/gabon-biz/cloud-run-source-deploy/gabon-biz-web --region=europe-west1 --allow-unauthenticated --port=3000 --memory=512Mi --max-instances=3 --project=gabon-biz
```

5. Deploy Firebase Hosting on **project gabon-biz**

```bash
cd /Users/okatech/okatech-projects/Digital\ GABON/MIN_ECO_NUM/gabon_biz && firebase deploy --only hosting --project gabon-biz
```

6. Verify deployment with curl
   // turbo

```bash
curl -s -X POST https://gabon-biz.web.app/api/auth/demo -H 'Content-Type: application/json' -d '{"accountId":"demo-entrepreneur"}' -D - -o /dev/null 2>&1 | grep -i 'set-cookie'
```

The cookie name MUST be `__session`. If it shows `gabon-biz-session`, the deployment failed.
