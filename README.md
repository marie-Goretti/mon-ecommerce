# Mon E-Commerce

> Application e-commerce full-stack moderne avec architecture microservices, conteneurisation Docker et infrastructure as code avec Terraform/AWS.


<img width="1874" height="878" alt="Capture d&#39;écran 2026-04-29 012606" src="https://github.com/user-attachments/assets/3a167ac1-43cc-4655-b11e-ce2c5355cd66" /><br><br>


![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat&logo=terraform&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Architecture du projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation et configuration](#installation-et-configuration)
- [Utilisation avec Docker](#utilisation-avec-docker)
- [Variables d'environnement](#variables-denvironnement)
- [Tests et CI/CD](#tests-et-cicd)
- [Documentation API](#documentation-api)
- [Déploiement avec Terraform](#déploiement-avec-terraform)
- [Monitoring](#monitoring)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## Fonctionnalités

### Frontend (React 19)

- Page d'accueil avec produits mis en avant
- Catalogue produits avec filtrage par catégories
- Détail produit avec galerie d'images
- Panier dynamique avec gestion du contexte React
- Processus de checkout et paiement sécurisé (intégré)
- Authentification (Login/Register) avec JWT
- Historique des commandes utilisateur
- Interface d'administration (dossier `admin/`)
- Pages informatives : À propos, Blog, Contact

### Backend (Node.js/Express)

- Authentification et autorisation (bcryptjs + jsonwebtoken)
- Gestion CRUD des produits et catégories
- Gestion du panier utilisateur
- Gestion des commandes et historique
- Gestion des profils utilisateurs
- Upload d'images avec Multer
- API RESTful avec CORS configuré
- Connexion PostgreSQL avec pg
- Middleware de gestion des erreurs et validation

### DevOps et Infrastructure

- Conteneurisation complète avec Docker et docker-compose
- Dockerfile multi-stage optimisé pour la production
-Infrastructure as Code avec Terraform (AWS : VPC, EC2 instances, RDS, ECR, Security Groups, ALB)
+ CI/CD automatisé avec GitHub Actions (tests, linting, build, déploiement sur EC2)

---

## Architecture du projet

```
mon-ecommerce/
├── frontend/                 # Application React (SPA)
│   ├── src/
│   │   ├── api/             # Services API (axios)
│   │   ├── components/      # Composants réutilisables
│   │   ├── context/         # Context React (auth, cart, payment)
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── admin/       # Interface administrateur
│   │   │   ├── Home.js
│   │   │   ├── Shop.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Payment.js   # Intégration paiement
│   │   │   ├── Orders.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   └── assets/          # Images, styles globaux
│   ├── Dockerfile           # Multi-stage build
│   ├── package.json
│   └── jest.config.js       # Configuration des tests
│
├── backend/                  # API Node.js/Express
│   ├── src/
│   │   ├── config/          # Configuration DB, JWT, Swagger
│   │   ├── controllers/     # Logique métier
│   │   ├── middleware/      # Auth, upload, erreurs, validation
│   │   ├── routes/          # Endpoints API
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── cart.js
│   │   │   ├── orders.js
│   │   │   ├── categories.js
│   │   │   ├── users.js
│   │   │   ├── upload.js
│   │   │   └── payment.js   # Endpoint paiement
│   │   ├── models/          # Modèles de données (Sequelize/Prisma)
│   │   ├── services/        # Services métier (payment, email)
│   │   └── index.js         # Point d'entrée + Swagger setup
│   ├── Dockerfile           # Multi-stage build avec user non-root
│   ├── package.json
│   └── jest.config.js       # Configuration des tests
│
├── infrastructure/terraform/ # Configuration IaC AWS
│   ├── main.tf              # Providers et backend S3
│   ├── variables.tf         # Variables d'entrée
│   ├── outputs.tf           # Outputs des ressources
│   ├── vpc.tf               # VPC, subnets, route tables
│   ├── ec2.tf               # EC2 instances, user-data, auto-scaling
│   ├── rds.tf               # Instance PostgreSQL RDS
│   ├── ecr.tf               # Registry pour images Docker
│   ├── alb.tf               # Application Load Balancer
│   ├── security_groups.tf   # Règles de sécurité
│   ├── autoscaling.tf       # Auto Scaling Group (optionnel)
│   └── terraform.tfvars     # Valeurs des variables
│
├── .github/workflows/        # Pipelines CI/CD
│   ├── ci.yml               # Tests, linting, sécurité, couverture
│   └── cd.yml               # Build Docker, push ECR, déploiement ECS
│
├── docker-compose.yml        # Orchestration multi-conteneurs (dev)
├── .env.example              # Template des variables d'environnement
├── .gitignore                # Fichiers exclus du versioning
├── .gitattributes            # Configuration Git (line endings)
└── README.md                 # Ce fichier
```

---

## Architecture

![Architecture du projet](docs/architecture.png)

**Flux principal :** Développeur → GitHub Actions (CI/CD) → AWS ECR → ECS Fargate (Frontend React + Backend Node.js) → Neon PostgreSQL (cloud)

---

## Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker** et **Docker Compose** >= 2.0
- **PostgreSQL** >= 14 (si exécution locale sans Docker)
- **Terraform** >= 1.5 (pour le déploiement AWS)
- **AWS CLI** configuré (pour Terraform)
- **Git** >= 2.30
- **Base de données** : [Neon](https://neon.tech) (PostgreSQL managé, pas besoin d'installer  PostgreSQL localement)

---

## Installation et configuration

### 1. Cloner le repository

```bash
git clone https://github.com/marie-Goretti/mon-ecommerce.git
cd mon-ecommerce
```

### 2. Configurer les variables d'environnement

Copiez le fichier `.env.example` et complétez les valeurs :

```bash
cp .env.example .env
```

### 3. Installation locale (sans Docker)

#### Backend

```bash
cd backend
npm install
npm run dev
```

> Le serveur démarre sur `http://localhost:5000`

#### Frontend

```bash
cd frontend
npm install
npm start
```

> L'application React démarre sur `http://localhost:3001`

---

## Utilisation avec Docker

### Démarrer l'application complète

```bash
# Build et lancement des conteneurs
docker-compose up --build

# Lancement en arrière-plan
docker-compose up -d --build
```

### Accès aux services

| Service | URL | Port |
|---------|-----|------|
| Frontend React | http://localhost:3001 | 3001:80 |
| Backend API | http://localhost:5000 | 5000:5000 |
| Documentation API | http://localhost:5000/api-docs | 5000:5000 |
| Base de données | _interne au réseau Docker_ | 5432 |

### Commandes utiles

```bash
# Arrêter les conteneurs
docker-compose down

# Reconstruire un service spécifique
docker-compose build backend
docker-compose up backend

# Voir les logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Nettoyer les volumes (attention : supprime les données)
docker-compose down -v

# Exécuter les tests dans les conteneurs
docker-compose run backend npm test
docker-compose run frontend npm test
```

---

### Variables d'environnement

Créez un fichier `.env` à la racine avec les variables suivantes :

```env
# === Backend ===
PORT=5000
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/ecommerce_db?sslmode=require
JWT_SECRET=votre_secret_jwt_tres_securise_ici
JWT_EXPIRE=7d
NODE_ENV=development

# === Frontend ===
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_votre_cle

# === Paiement (Stripe) ===
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
STRIPE_WEBHOOK_SECRET=whsec_votre_secret

# === AWS / Terraform ===
AWS_REGION=eu-west-3
ECR_REPO_URL=123456789.dkr.ecr.eu-west-3.amazonaws.com/mon-ecommerce

# === Monitoring ===
CLOUDWATCH_LOG_GROUP=/ecs/mon-ecommerce
```

> **Important** : Ne commitez jamais le fichier `.env` dans le repository. Il est déjà listé dans `.gitignore`.

---

## Tests et CI/CD

| Dossier | Type | Framework |
|---------|------|-----------|
| `tests/integration/` | Tests d'intégration API | Jest + Supertest |
| `tests/unit/` | Tests unitaires logique métier | Jest |
| `backend/src/` | Tests unitaires backend | Jest |
| `frontend/src/` | Tests composants | React Testing Library |

```bash
cd backend && npm test && npm run test:coverage
cd frontend && npm test
```


### Couverture minimale requise

Le projet doit maintenir une couverture de tests d'au moins 70% :

- Tests unitaires pour les contrôleurs et services
- Tests d'intégration pour les endpoints API
- Tests de composants React critiques

### Pipelines GitHub Actions

Le projet inclut deux workflows :

| Workflow | Fichier | Déclencheur | Actions |
|----------|---------|-------------|---------|
| **CI** | `.github/workflows/ci.yml` | Push/PR sur `main` | Lint, tests frontend/backend, sécurité (npm audit), couverture |
| **CD** | `.github/workflows/cd.yml` | Merge sur `main` | Build Docker multi-stage, scan de vulnérabilités, push ECR, déploiement ECS |

### Configuration des secrets GitHub

Pour activer le déploiement automatique, configurez les secrets suivants dans votre repository :

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
STRIPE_SECRET_KEY
```

---

## Documentation API

L'API est documentée selon le standard OpenAPI 3.0 avec Swagger UI.

### Accéder à la documentation interactive

Une fois le backend lancé :

```
http://localhost:5000/api-docs
```

### Endpoints principaux

#### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Inscription utilisateur |
| POST | /api/auth/login | Connexion et génération JWT |
| GET | /api/auth/me | Récupérer le profil utilisateur |

#### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/products | Liste des produits avec pagination |
| GET | /api/products/:id | Détail d'un produit |
| POST | /api/products | Créer un produit (admin) |
| PUT | /api/products/:id | Mettre à jour un produit (admin) |
| DELETE | /api/products/:id | Supprimer un produit (admin) |

#### Panier et Commandes

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/cart | Récupérer le panier utilisateur |
| POST | /api/cart | Ajouter un produit au panier |
| DELETE | /api/cart/:productId | Retirer un produit du panier |
| POST | /api/orders | Créer une commande |
| GET | /api/orders | Historique des commandes |

#### Paiement

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/payment/create-intent | Créer une intention de paiement |
| POST | /api/payment/webhook | Webhook pour confirmation paiement |

### Générer la documentation localement

```bash
cd backend
npm run docs:generate  # Si script configuré
```

---

## Déploiement avec Terraform

### Prérequis AWS

- Un compte AWS configuré avec les permissions nécessaires
- AWS CLI installé et authentifié : `aws configure`
- Bucket S3 pour l'état Terraform (déjà créé ou à créer)

### Initialisation et déploiement

```bash
cd infrastructure/terraform

# Initialiser Terraform avec backend S3
terraform init

# Valider la configuration
terraform validate

# Prévisualiser les changements
terraform plan -var-file=terraform.tfvars

# Appliquer l'infrastructure
terraform apply -var-file=terraform.tfvars
```

### Ressources déployées

### Ressources déployées

- VPC avec sous-réseaux publics et privés sur plusieurs AZ
- Security Groups pour EC2, RDS, ALB avec règles restrictives
- Instances EC2 (Amazon Linux 2/2023) avec Docker Engine
- User-data script pour l'installation automatique de Docker et le déploiement
- Application Load Balancer avec target group pointant vers les instances EC2
- Auto Scaling Group (optionnel) pour la montée en charge
- Instance RDS PostgreSQL avec sauvegardes automatiques
- Registry ECR pour le stockage des images Docker
- CloudWatch Log Groups pour la centralisation des logs

### Mise à jour de l'application

Après un push sur la branche `main`, le pipeline CD :

1. Build l'image Docker avec le tag du commit
2. Scan l'image pour vulnérabilités
3. Push vers ECR
4. Déclenche un déploiement sur les instances EC2 via :
    - SSH + docker pull/run (simple)
    - OU AWS CodeDeploy (recommandé pour le blue/green)
    - OU user-data re-run via SSM

### Nettoyage (attention : destructif)

```bash
terraform destroy -var-file=terraform.tfvars
```

---

## Monitoring

### CloudWatch

Les logs applicatifs sont centralisés dans CloudWatch :

- Logs backend : `/ecs/mon-ecommerce/backend`
- Logs frontend : `/ecs/mon-ecommerce/frontend`
- Métriques custom : temps de réponse, erreurs, taux de conversion

### Métriques applicatives

L'application expose des métriques Prometheus à l'endpoint :

```
GET /metrics
```

### Health checks

- Endpoint de santé : `GET /api/health`
- Docker HEALTHCHECK configuré dans les Dockerfile
- ECS utilise les health checks pour le rolling deployment

---

## Contribuer

Les contributions sont les bienvenues ! Voici comment procéder :

1. Fork le repository
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'feat: add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Conventions de commit

Ce projet utilise le format Conventional Commits :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation uniquement
- `style:` Formatage, points-virgules manquants, etc.
- `refactor:` Changement de code ni fix ni feature
- `test:` Ajout ou correction de tests
- `chore:` Maintenance, dépendances, config

### Revue de code

Toute Pull Request doit :

- Passer les checks CI (tests, linting, sécurité)
- Inclure des tests pour les nouvelles fonctionnalités
- Maintenir ou améliorer la couverture de code
- Être approuvée par au moins un reviewer

---

## Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

## Auteur

**marie-Goretti**

[Profil GitHub](https://github.com/marie-Goretti)

---

> **Note** : Ce projet est en développement actif. N'hésitez pas à ouvrir une issue pour signaler un bug ou proposer une amélioration !

---

*Document mis à jour le 29 avril 2026 — Dernière modification : commit `dde6e01` (ajustement mobile)*
