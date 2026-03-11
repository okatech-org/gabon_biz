# GABON BIZ

> 🇬🇦 Super-application économique et entrepreneuriale du Gabon

**Version :** 0.1.0  
**Client :** Ministère de l'Économie Numérique, de la Digitalisation et de l'Innovation (MENUDI)

## Architecture

```
gabon_biz/
├── apps/
│   ├── web/              → Next.js 14 (App Router, Tailwind, shadcn/ui)
│   ├── mobile/           → React Native (Expo, TypeScript)
│   └── api-gateway/      → Kong API Gateway (declarative YAML)
├── services/
│   ├── entrepreneur/     → M1 — Guichet Unique Entrepreneur     :3001
│   ├── marches-publics/  → M2 — Marchés Publics Numériques      :3002
│   ├── innovation-hub/   → M3 — Innovation Hub (KIMBA 2.0)      :3003
│   ├── incubateur/       → M4 — Incubateur Digital (SING 2.0)   :3004
│   ├── investir/         → M5 — Investir au Gabon               :3005
│   ├── observatoire/     → M6 — Observatoire Économie Numérique :3006
│   └── filieres/         → M7 — Filières Sectorielles           :3007
├── packages/
│   ├── shared/           → Types, DTOs, utilitaires partagés
│   ├── ui/               → Composants React réutilisables
│   └── database/         → Prisma schema + client
└── infra/
    ├── docker-compose.dev.yml
    ├── k8s/              → Kubernetes manifests
    └── ci/               → CI/CD configs
```

## Démarrage rapide

```bash
# Installer les dépendances
pnpm install

# Lancer l'infrastructure Docker (PostgreSQL, Redis, RabbitMQ, ES, Kong)
pnpm docker:dev

# Lancer le frontend web
pnpm dev:web

# Lancer tous les microservices API
pnpm dev:api
```

## Stack technique

| Couche           | Technologie                                   |
| ---------------- | --------------------------------------------- |
| Frontend Web     | Next.js 14, React 18, Tailwind CSS, shadcn/ui |
| Frontend Mobile  | React Native, Expo                            |
| Backend          | NestJS (Node.js 20) × 7 microservices         |
| ORM              | Prisma                                        |
| Base de données  | PostgreSQL 16                                 |
| Cache            | Redis 7                                       |
| Recherche        | Elasticsearch 8                               |
| Message Broker   | RabbitMQ 3.13                                 |
| API Gateway      | Kong 3.x                                      |
| Conteneurisation | Docker + Kubernetes                           |

---

_NTSAGUI Digital & OKA Tech — Mars 2026_
