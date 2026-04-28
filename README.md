# Mon E-Commerce

> Application e-commerce full-stack moderne avec architecture microservices, conteneurisation Docker et infrastructure as code avec Terraform/AWS.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat&logo=terraform&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Architecture du projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation et configuration](#installation-et-configuration)
- [Utilisation avec Docker](#utilisation-avec-docker)
- [Variables d'environnement](#variables-denvironnement)
- [Tests et CI/CD](#tests-et-cicd)
- [Déploiement avec Terraform](#déploiement-avec-terraform)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## Fonctionnalités

### Frontend (React 19)
- Page d'accueil avec produits mis en avant
- Catalogue produits avec filtrage par catégories
- Détail produit avec galerie d'images
- Panier dynamique avec gestion du contexte React
- Processus de checkout et paiement sécurisé
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

### DevOps et Infrastructure
- Conteneurisation complète avec Docker et docker-compose
- Infrastructure as Code avec Terraform (AWS : VPC, EC2, ECR, Security Groups)
- CI/CD automatisé avec GitHub Actions (tests, build, déploiement)
- Gestion sécurisée des secrets via variables d'environnement

---

## Architecture du projet

```
mon-ecommerce/
├── frontend/                 # Application React (SPA)
│   ├── src/
│   │   ├── api/             # Services API (axios)
│   │   ├── components/      # Composants réutilisables
│   │   ├── context/         # Context React (auth, cart)
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── admin/       # Interface administrateur
│   │   │   ├── Home.js
│   │   │   ├── Shop.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Orders.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   └── assets/          # Images, styles globaux
│   ├── Dockerfile
│   └── package.json
│
├── backend/                  # API Node.js/Express
│   ├── src/
│   │   ├── config/          # Configuration DB, JWT
│   │   ├── controllers/     # Logique métier
│   │   ├── middleware/      # Auth, upload, erreurs
│   │   ├── routes/          # Endpoints API
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── cart.js
│   │   │   ├── orders.js
│   │   │   ├── categories.js
│   │   │   ├── users.js
│   │   │   └── upload.js
│   │   └── index.js         # Point d'entrée
│   ├── Dockerfile
│   └── package.json
│
├── infrastructure/terraform/ # Configuration IaC AWS
│   ├── main.tf
│   ├── variables.tf
│   ├── vpc.tf
│   ├── ec2.tf
│   ├── ecr.tf
│   ├── security_groups.tf
│   └── terraform.tfvars
│
├── .github/workflows/        # Pipelines CI/CD
│   ├── ci.yml               # Tests et linting
│   └── cd.yml               # Build et déploiement
│
├── docker-compose.yml        # Orchestration multi-conteneurs
├── .env                      # Variables d'environnement (à ne pas commiter)
└── .gitignore
```

---

## Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker** et **Docker Compose** >= 2.0
- **PostgreSQL** >= 14 (si exécution locale sans Docker)
- **Terraform** >= 1.5 (pour le déploiement AWS)
- **AWS CLI** configuré (pour Terraform)

---

## Installation et configuration

### 1. Cloner le repository
```bash
git clone https://github.com/marie-Goretti/mon-ecommerce.git
cd mon-ecommerce
```

### 2. Configurer les variables d'environnement
Copiez le fichier `.env` exemple et complétez les valeurs :
```bash
cp .env.example .env  # si disponible
# Sinon, créez manuellement le fichier .env à la racine
```

### 3. Installation locale (sans Docker)

#### Backend
```bash
cd backend
npm install
npm run dev  # Mode développement avec nodemon
```
> Le serveur démarre sur `http://localhost:5000`

#### Frontend
```bash
cd frontend
npm install
npm start
```
> L'application React démarre sur `http://localhost:3001` (port configuré dans docker-compose)

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
| Base de données | *interne au réseau Docker* | 5432 |

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
```

---

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# === Backend ===
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db
JWT_SECRET=votre_secret_jwt_tres_securise_ici
NODE_ENV=development

# === Frontend ===
REACT_APP_API_URL=http://localhost:5000/api

# === AWS / Terraform (pour le déploiement) ===
AWS_REGION=eu-west-3
AWS_PROFILE=default
TERRAFORM_STATE_BUCKET=mon-ecommerce-tfstate
```

> **Important** : Ne commitez jamais le fichier `.env` dans le repository. Il est déjà listé dans `.gitignore`.

---

## Tests et CI/CD

### Tests locaux
```bash
# Backend (à implémenter selon votre framework de test)
cd backend
npm test

# Frontend (Jest + React Testing Library)
cd frontend
npm test
npm run test:coverage  # si configuré
```

### Pipelines GitHub Actions
Le projet inclut deux workflows :

| Workflow | Fichier | Déclencheur | Actions |
|----------|---------|-------------|---------|
| **CI** | `.github/workflows/ci.yml` | Push/PR sur `main` | Lint, tests frontend et backend |
| **CD** | `.github/workflows/cd.yml` | Merge sur `main` | Build Docker, push vers ECR, déploiement |

Pour activer le déploiement automatique :
1. Configurez les secrets GitHub : `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
2. Assurez-vous que le registry ECR existe dans votre compte AWS

---

## Déploiement avec Terraform

### Prérequis AWS
- Un compte AWS configuré avec les permissions nécessaires
- AWS CLI installé et authentifié : `aws configure`

### Initialisation et déploiement
```bash
cd infrastructure/terraform

# Initialiser Terraform
terraform init

# Valider la configuration
terraform validate

# Prévisualiser les changements
terraform plan -var-file=terraform.tfvars

# Appliquer l'infrastructure
terraform apply -var-file=terraform.tfvars
```

### Ressources déployées
- VPC avec sous-réseaux publics et privés
- Security Groups pour le backend et frontend
- Instance EC2 pour l'hébergement
- Registry ECR pour les images Docker
- Paires de clés SSH pour l'accès sécurisé

### Nettoyage (attention : destructif)
```bash
terraform destroy -var-file=terraform.tfvars
```

---

## Contribuer

Les contributions sont les bienvenues ! Voici comment procéder :

1. Fork le repository
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'feat: add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Conventions de commit
Ce projet utilise le format [Conventional Commits](https://www.conventionalcommits.org/) :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation uniquement
- `style:` Formatage, points-virgules manquants, etc.
- `refactor:` Changement de code ni fix ni feature
- `test:` Ajout ou correction de tests
- `chore:` Maintenance, dépendances, config

---

## Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

## Auteur

**marie-Goretti**  
[Profil GitHub](https://github.com/marie-Goretti)

---

> **Note** : Ce projet est en développement actif. N'hésitez pas à ouvrir une issue pour signaler un bug ou proposer une amélioration !

```markdown
Si ce projet vous aide, n'oubliez pas de mettre une étoile sur GitHub !
```

---

*Document généré le 28 avril 2026 — Dernière mise à jour : commit `aafc7b0` (paiement success)*
