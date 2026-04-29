# Architecture — mon-ecommerce

> Document de décisions d'architecture (ADR) et vue d'ensemble technique du projet.

---

## Vue d'ensemble

**mon-ecommerce** est une application e-commerce full-stack organisée en deux services principaux (frontend et backend), conteneurisés via Docker et déployés sur AWS ECS Fargate. La base de données est hébergée sur **Neon** (PostgreSQL managé cloud), externe à l'infrastructure AWS.

```
Utilisateur (HTTPS)
        │
        ▼
Application Load Balancer (AWS ALB)
        │
   ┌────┴────┐
   ▼         ▼
Frontend   Backend API
React 19   Node.js/Express
(port 3001) (port 5000)
                │
                ▼
        Neon PostgreSQL
        (cloud managé)
```

---

## Décisions d'architecture

### ADR-01 — React 19 pour le frontend

**Contexte** : Choix du framework frontend.

**Décision** : React 19 avec architecture SPA (Single Page Application).

**Raisons** :
- Gestion d'état native via Context API (auth, panier, paiement) sans Redux
- Écosystème mature et grande communauté
- Compatible avec les dernières pratiques (hooks, lazy loading)

**Conséquences** : Le frontend est servi via Nginx dans un conteneur Docker multi-stage, ce qui réduit la taille de l'image finale.

---

### ADR-02 — Node.js/Express pour le backend

**Contexte** : Choix du runtime et framework backend.

**Décision** : Node.js 18 LTS avec Express.js.

**Raisons** :
- Même langage (JavaScript) côté frontend et backend → cohérence de l'équipe
- Performances I/O non-bloquantes adaptées aux APIs REST
- Écosystème riche : bcryptjs, jsonwebtoken, multer, pg

**Conséquences** : L'API expose des endpoints RESTful documentés via Swagger/OpenAPI sur `/api-docs`.

---

### ADR-03 — Neon PostgreSQL (cloud managé) pour la base de données

**Contexte** : Choix de la base de données et de son hébergement.

**Décision** : PostgreSQL hébergé sur [Neon](https://neon.tech) (service managé cloud), externe à l'infrastructure AWS.

**Raisons** :
- Pas de gestion de serveur de base de données à maintenir
- Connexion SSL sécurisée via `DATABASE_URL` avec `?sslmode=require`
- Scaling automatique et sauvegardes gérées par Neon
- Réduction des coûts par rapport à une instance RDS AWS dédiée

**Conséquences** : La connexion se fait depuis le backend via la variable d'environnement `DATABASE_URL`. Le fichier `rds.tf` Terraform reste présent pour une éventuelle migration vers RDS.

**Chaîne de connexion** :
```
postgresql://user:password@ep-xxx.neon.tech/ecommerce_db?sslmode=require
```

---

### ADR-04 — Docker multi-stage pour la conteneurisation

**Contexte** : Stratégie de conteneurisation pour la production.

**Décision** : Dockerfile multi-stage pour frontend et backend.

**Raisons** :
- Séparation build/runtime → images finales légères
- Utilisateur non-root dans le conteneur (sécurité)
- Health checks intégrés au niveau Docker et ECS

**Structure des stages** :
```
Stage 1 (builder) : node:18-alpine → npm ci + build
Stage 2 (runtime) : node:18-alpine → copie uniquement les artefacts
```

---

### ADR-05 — GitHub Actions pour le CI/CD

**Contexte** : Choix de la plateforme d'intégration et déploiement continus.

**Décision** : GitHub Actions avec deux workflows distincts (`ci.yml` et `cd.yml`).

**Raisons** :
- Intégration native avec le repository GitHub
- Secrets gérés directement dans GitHub Settings
- Pas d'infrastructure CI à maintenir

**Pipeline CI (`ci.yml`)** — déclenché sur chaque push/PR :
1. Lint (ESLint)
2. Tests frontend (Jest + React Testing Library)
3. Tests backend (Jest + Supertest)
4. Audit de sécurité (`npm audit`)
5. Rapport de couverture (minimum 70%)

**Pipeline CD (`cd.yml`)** — déclenché sur merge vers `main` :
1. Build image Docker avec tag du commit SHA
2. Scan de vulnérabilités de l'image
3. Push vers AWS ECR
4. Mise à jour du service ECS (rolling deployment)

---

### ADR-06 — AWS ECS Fargate pour l'orchestration

**Contexte** : Choix de la plateforme de déploiement des conteneurs.

**Décision** : AWS ECS Fargate (serverless containers) dans la région `eu-west-3` (Paris).

**Raisons** :
- Pas de gestion de serveurs EC2
- Scaling automatique selon la charge
- Intégration native avec ALB et CloudWatch
- Rolling deployment sans downtime

**Conséquences** : L'infrastructure est entièrement définie en code via Terraform (`infrastructure/terraform/`).

---

## Structure des composants

```
mon-ecommerce/
├── frontend/          → SPA React 19, servi par Nginx
├── backend/           → API REST Node.js/Express
├── infrastructure/
│   └── terraform/     → IaC AWS (VPC, ECS, ECR, ALB, Security Groups)
├── tests/
│   ├── integration/   → Tests d'intégration API (Jest + Supertest)
│   └── unit/          → Tests unitaires logique métier
├── docs/              → Ce dossier
└── .github/workflows/ → Pipelines CI/CD
```

---

## Flux de données

### Authentification

```
Client → POST /api/auth/login
       → Vérification bcryptjs (hash password)
       → Génération JWT (jsonwebtoken)
       → Retour token au client
       → Client stocke le token (localStorage)
       → Chaque requête suivante : Authorization: Bearer <token>
```

### Commande produit

```
Client (panier) → POST /api/orders
               → Middleware auth (vérif JWT)
               → Création commande en DB (Neon PostgreSQL)
               → POST /api/payment/create-intent (Stripe)
               → Retour client_secret Stripe au client
               → Client confirme paiement côté Stripe
               → Webhook Stripe → POST /api/payment/webhook
               → Mise à jour statut commande en DB
```

---

## Sécurité

| Mesure | Implémentation |
|--------|---------------|
| Mots de passe hashés | bcryptjs (salt rounds: 10) |
| Authentification | JWT avec expiration (7j) |
| CORS configuré | Origines autorisées explicitement |
| Conteneur non-root | `USER nodejs` dans Dockerfile |
| Secrets | GitHub Secrets + variables d'environnement |
| DB chiffrée | SSL obligatoire (`sslmode=require`) |
| Scan vulnérabilités | `npm audit` en CI + scan image Docker en CD |

---

## Monitoring

| Outil | Usage |
|-------|-------|
| CloudWatch | Logs centralisés (`/ecs/mon-ecommerce/backend` et `/frontend`) |
| Prometheus | Métriques applicatives exposées sur `GET /metrics` |
| Health check | `GET /api/health` → utilisé par ECS pour le rolling deployment |

---

*Document maintenu par [marie-Goretti](https://github.com/marie-Goretti) — mis à jour le 29 avril 2026*