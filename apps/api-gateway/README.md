# GABON BIZ — API Gateway (Kong)

## Architecture

Kong 3.7 en mode DB-less (déclaratif) route toutes les requêtes API vers les 7 microservices NestJS.

```
Client → Kong :8000/api/v1/{module} → NestJS Service :300x
```

## Routes

| Route | Service | Port | Auth |
|-------|---------|------|------|
| `/api/v1/entrepreneur` | M1 — Guichet Unique | 3001 | JWT |
| `/api/v1/marches` | M2 — Marchés Publics | 3002 | JWT |
| `/api/v1/innovation` | M3 — Innovation Hub | 3003 | JWT |
| `/api/v1/incubateur` | M4 — Incubateur | 3004 | JWT |
| `/api/v1/investir` | M5 — Investir | 3005 | JWT |
| `/api/v1/observatoire` | M6 — Observatoire | 3006 | Public |
| `/api/v1/filieres` | M7 — Filières | 3007 | Public |
| `/api/health` | Kong Status | — | Public |

## Plugins actifs

- **JWT** — Vérification des tokens GABON ID (HS256)
- **Rate Limiting** — 100-200 req/min par service
- **CORS** — Origines autorisées (localhost + prod)
- **Correlation ID** — Header `X-Request-ID` auto-généré
- **Request/Response Transformer** — Headers gateway + nettoyage
- **File Log** — Logs dans `/tmp/kong-access.log`
- **Prometheus** — Métriques par consumer + latence

## Commandes

```bash
# Démarrer l'infra Docker (Kong inclus)
pnpm docker:dev

# Tester les routes Kong
pnpm test:kong

# Admin API
curl http://localhost:8001/status
curl http://localhost:8001/services
curl http://localhost:8001/routes
curl http://localhost:8001/upstreams
```
