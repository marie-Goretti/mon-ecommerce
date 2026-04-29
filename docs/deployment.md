# Guide de déploiement — mon-ecommerce

> Instructions complètes pour déployer l'application en environnement **staging** et **production** sur AWS.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- [ ] Un compte AWS avec les droits IAM nécessaires (ECS, ECR, RDS, VPC, ALB)
- [ ] AWS CLI installé et configuré (`aws configure`)
- [ ] Terraform >= 1.5 installé
- [ ] Docker installé
- [ ] Les secrets configurés dans GitHub Settings → Secrets

### Secrets GitHub requis

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | Clé d'accès IAM AWS |
| `AWS_SECRET_ACCESS_KEY` | Clé secrète IAM AWS |
| `AWS_REGION` | Région AWS (ex: `eu-west-3`) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe |
| `DATABASE_URL` | URL de connexion Neon PostgreSQL |

---

## Environnements

| Environnement | Branche | Déclencheur | URL |
|---------------|---------|-------------|-----|
| **Staging** | `develop` | Push sur `develop` | `https://staging.mon-ecommerce.fr` |
| **Production** | `main` | Merge sur `main` | `https://mon-ecommerce.fr` |

---

## Déploiement local (développement)

### 1. Cloner et configurer

```bash
git clone https://github.com/marie-Goretti/mon-ecommerce.git
cd mon-ecommerce
cp .env.example .env
# Éditer .env avec vos valeurs
```

### 2. Lancer avec Docker Compose

```bash
docker-compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3001 |
| Backend API | http://localhost:5000 |
| Swagger | http://localhost:5000/api-docs |

### 3. Vérifier que tout fonctionne

```bash
curl http://localhost:5000/api/health
# Réponse attendue : {"status":"OK","timestamp":"..."}
```

---

## Déploiement AWS (production)

### Étape 1 — Initialiser l'infrastructure Terraform

```bash
cd infrastructure/terraform

# Initialiser avec le backend S3
terraform init

# Vérifier la configuration
terraform validate

# Prévisualiser les ressources qui seront créées
terraform plan -var-file=terraform.tfvars
```

### Étape 2 — Appliquer l'infrastructure

```bash
terraform apply -var-file=terraform.tfvars
```

Ressources créées :

- VPC avec sous-réseaux publics et privés (2 zones de disponibilité)
- Security Groups (ALB, ECS, accès Neon)
- Cluster ECS Fargate
- Registry ECR (images Docker)
- Application Load Balancer avec HTTPS
- CloudWatch Log Groups

> **Note base de données** : Le projet utilise **Neon PostgreSQL** (cloud managé externe). Aucune instance RDS n'est créée. La connexion se fait via `DATABASE_URL` dans les variables d'environnement ECS.

### Étape 3 — Récupérer les outputs Terraform

```bash
terraform output
# Exemple de sorties :
# alb_dns_name = "ecommerce-alb-xxx.eu-west-3.elb.amazonaws.com"
# ecr_repository_url = "123456789.dkr.ecr.eu-west-3.amazonaws.com/mon-ecommerce"
```

### Étape 4 — Build et push manuel de l'image (si besoin)

```bash
# Authentification ECR
aws ecr get-login-password --region eu-west-3 | \
  docker login --username AWS --password-stdin \
  123456789.dkr.ecr.eu-west-3.amazonaws.com

# Build
docker build -t mon-ecommerce:latest ./backend
docker build -t mon-ecommerce-frontend:latest ./frontend

# Tag
docker tag mon-ecommerce:latest \
  123456789.dkr.ecr.eu-west-3.amazonaws.com/mon-ecommerce:latest

# Push
docker push 123456789.dkr.ecr.eu-west-3.amazonaws.com/mon-ecommerce:latest
```

### Étape 5 — Forcer un redéploiement ECS

```bash
aws ecs update-service \
  --cluster ecommerce-cluster \
  --service ecommerce-service \
  --force-new-deployment \
  --region eu-west-3
```

---

## Déploiement automatique (CI/CD)

Le déploiement en production est **entièrement automatisé** via GitHub Actions.

### Flux automatique

```
git push origin main
        │
        ▼
ci.yml  →  Tests + Lint + Audit sécurité
        │
        ▼ (si CI passe)
cd.yml  →  Build Docker (tag = commit SHA)
        →  Scan vulnérabilités image
        →  Push vers AWS ECR
        →  aws ecs update-service (rolling deployment)
```

### Rolling deployment (zéro downtime)

ECS remplace les conteneurs progressivement :

1. Nouvelle tâche lancée avec la nouvelle image
2. Health check vérifié (`GET /api/health` → 200)
3. Ancien conteneur arrêté seulement si le nouveau est healthy
4. En cas d'échec : rollback automatique vers l'image précédente

---

## Déploiement staging

Pour déployer sur staging sans toucher la production :

```bash
git checkout -b develop
git push origin develop
```

Le workflow CI/CD détecte la branche `develop` et déploie sur l'environnement staging (cluster ECS séparé défini dans `terraform.tfvars.staging`).

```bash
# Appliquer l'infra staging
cd infrastructure/terraform
terraform workspace new staging
terraform apply -var-file=terraform.tfvars.staging
```

---

## Variables d'environnement ECS

Les variables sont injectées dans la Task Definition ECS. Ne jamais les coder en dur dans le code source.

```json
{
  "environment": [
    { "name": "NODE_ENV", "value": "production" },
    { "name": "PORT", "value": "5000" },
    { "name": "JWT_EXPIRE", "value": "7d" }
  ],
  "secrets": [
    { "name": "DATABASE_URL", "valueFrom": "arn:aws:secretsmanager:..." },
    { "name": "JWT_SECRET", "valueFrom": "arn:aws:secretsmanager:..." },
    { "name": "STRIPE_SECRET_KEY", "valueFrom": "arn:aws:secretsmanager:..." }
  ]
}
```

> Les secrets sensibles sont stockés dans **AWS Secrets Manager** et référencés par ARN dans la Task Definition.

---

## Vérifications post-déploiement

Après chaque déploiement, vérifier :

```bash
# 1. Health check API
curl https://mon-ecommerce.fr/api/health

# 2. Statut du service ECS
aws ecs describe-services \
  --cluster ecommerce-cluster \
  --services ecommerce-service \
  --region eu-west-3 \
  --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount}'

# 3. Logs récents CloudWatch
aws logs tail /ecs/mon-ecommerce/backend --follow --region eu-west-3

# 4. Vérifier les métriques Prometheus
curl https://mon-ecommerce.fr/metrics
```

---

## Rollback

### Rollback automatique

ECS annule automatiquement le déploiement si le health check échoue dans les 5 minutes.

### Rollback manuel

```bash
# Lister les images disponibles dans ECR
aws ecr list-images \
  --repository-name mon-ecommerce \
  --region eu-west-3

# Redéployer avec un tag précédent
aws ecs update-service \
  --cluster ecommerce-cluster \
  --service ecommerce-service \
  --task-definition ecommerce-task:PREVIOUS_REVISION \
  --region eu-west-3
```

---

## Nettoyage infrastructure

> ⚠️ **Attention** : Ces commandes suppriment définitivement toutes les ressources AWS.

```bash
cd infrastructure/terraform
terraform destroy -var-file=terraform.tfvars
```

---

## Troubleshooting

### Conteneur qui ne démarre pas

```bash
# Voir les logs de la tâche ECS arrêtée
aws ecs describe-tasks \
  --cluster ecommerce-cluster \
  --tasks TASK_ARN \
  --region eu-west-3
```

### Erreur de connexion à la base de données

```bash
# Vérifier que DATABASE_URL est bien défini et que sslmode=require est présent
# Tester la connexion depuis le backend local :
node -e "const { Pool } = require('pg'); const p = new Pool({ connectionString: process.env.DATABASE_URL }); p.query('SELECT NOW()').then(r => console.log(r.rows)).catch(console.error)"
```

### Pipeline CI/CD échoue

1. Vérifier les secrets GitHub (`AWS_ACCESS_KEY_ID`, etc.)
2. Vérifier que le bucket S3 Terraform existe bien
3. Consulter les logs dans l'onglet **Actions** du repository GitHub

---

*Document maintenu par [marie-Goretti](https://github.com/marie-Goretti) — mis à jour le 29 avril 2026*