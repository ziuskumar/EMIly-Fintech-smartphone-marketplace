# EMIly — Fintech Smartphone Marketplace

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Express">
  <img src="https://img.shields.io/badge/PostgreSQL-Prisma-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Prisma">
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose">
  <img src="https://img.shields.io/badge/AWS-Ready-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS Ready">
</p>

<p align="center">
  <strong>A production-oriented full-stack smartphone marketplace built around transparent EMI financing.</strong>
</p>

<p align="center">
  Product discovery • Variant-aware pricing • EMI plans • REST API • PostgreSQL • Docker • AWS-ready architecture
</p>

---

## 📸 Product Preview

<!-- > **Tip:** Replace the preview image below with a screenshot from your deployed application once available. -->

<p align="center">
  <img src="./server/public/images/FrontPage.png" alt="EMIly marketplace preview" width="100%">
</p>
<p align="center">
  <img src="./server/public/images/ProdImg.png" alt="EMIly marketplace preview" width="100%">
</p>

---

## ✨ Overview

**EMIly** is a responsive, full-stack smartphone marketplace designed to make installment-based phone shopping simple and transparent.

The application separates **products, purchasable configurations, images, prices, and lender-specific EMI plans** into a structured PostgreSQL data model. The React client consumes this information exclusively through a REST API, while the Express/Prisma backend handles validation, business logic, database access, and consistent error responses.

### Why EMIly?

- 🔎 Search and filter the smartphone catalogue
- 📱 Browse product-specific configurations
- 💰 Keep variant pricing tied to the selected configuration
- 🏦 Compare EMI plans from multiple lenders
- 🖼️ Serve product imagery from structured catalogue data
- ⚡ Use a clean REST API between frontend and backend
- 🐳 Run the complete stack with Docker Compose
- ☁️ Follow an AWS-ready container deployment architecture

---

## 🧭 Quick Navigation

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Data Model](#-data-model)
- [Project Structure](#-project-structure)
- [Run with Docker](#-run-with-docker)
- [Run Locally](#-run-locally)
- [API Documentation](#-api-documentation)
- [Catalogue Query Parameters](#-catalogue-query-parameters)
- [Seed Data](#-seed-data)
- [AWS Deployment](#-aws-deployment)
- [Engineering Decisions](#-engineering-decisions)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Features

### Customer-facing

| Feature                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| 📱 Smartphone catalogue | Browse current flagship and mid-range devices                |
| 🔍 Search               | Search the catalogue by product information                  |
| 🏷️ Brand filtering      | Filter products by manufacturer                              |
| 💵 Price filtering      | Filter by minimum and maximum price                          |
| ↕️ Sorting              | Featured, newest, lowest-price and highest-price sorting     |
| 🎨 Variants             | Select storage, colour and other configuration-specific data |
| 🖼️ Product images       | Images are associated with individual variants               |
| 🏦 EMI comparison       | View lender plans for the selected configuration             |
| 📱 Responsive UI        | Designed for desktop and mobile layouts                      |

### Engineering

- React 19 + Vite frontend
- React Router for route-level navigation
- Tailwind CSS for UI styling
- Express REST API
- Zod request validation
- Prisma ORM
- PostgreSQL persistence
- Centralized error middleware
- Dockerized frontend, backend and database
- Nginx production serving for the React build
- AWS ECS/RDS/ECR deployment path

---

## 🛠️ Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Frontend   | React 19, Vite                                   |
| Styling    | Tailwind CSS                                     |
| Routing    | React Router                                     |
| Backend    | Node.js, Express                                 |
| Validation | Zod                                              |
| ORM        | Prisma                                           |
| Database   | PostgreSQL                                       |
| Web server | Nginx                                            |
| Containers | Docker, Docker Compose                           |
| AWS target | ECR, ECS Fargate, RDS, Secrets Manager, ALB, ACM |

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│                  React 19 + Vite + Tailwind                │
└─────────────────────────────┬───────────────────────────────┘
                              │ REST / JSON
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Express API                             │
│                                                             │
│   Routes → Controllers → Services → Prisma                  │
│                         │                                   │
│                    Zod Validation                            │
│                         │                                   │
│                  Error Middleware                           │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       PostgreSQL                            │
│                                                             │
│ Product → Variant → EMI Plan                                │
│                  ↘ Images                                   │
└─────────────────────────────────────────────────────────────┘
```

### Request flow

```text
User action
    ↓
React page/component
    ↓
client/src/lib/api.js
    ↓
Express route
    ↓
Controller
    ↓
Service layer
    ↓
Prisma ORM
    ↓
PostgreSQL
    ↓
JSON response
    ↓
React UI
```

---

## 🗂️ Project Structure

```text
EMIly-Fintech-smartphone-marketplace/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── lib/
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── Catalogue.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Product.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🗃️ Data Model

The database is designed so that financing information belongs to the **actual purchasable configuration**, rather than being detached from the product.

```text
Product
  │
  ├── Variant
  │     ├── Storage
  │     ├── Colour
  │     ├── Selling Price
  │     ├── Images
  │     └── EMI Plans
  │            ├── Provider
  │            ├── Tenure
  │            ├── Monthly EMI
  │            └── Cashback
  │
  └── ...
```

### Relationship

**One Product → Many Variants → Many EMI Plans**

This allows two configurations of the same phone to have different:

- prices
- colours
- storage capacities
- images
- lender plans
- monthly EMI amounts
- cashback values

---

## 🐳 Run with Docker

The production-oriented Compose stack contains:

- PostgreSQL
- Express/Prisma API
- Nginx-served React production build

### 1. Build and start

```bash
docker compose up --build
```

### 2. Seed the catalogue

On first launch:

```bash
docker compose exec api npm run prisma:seed
```

### 3. Open the application

```text
http://localhost:8080
```

### Stop the stack

```bash
docker compose down
```

### Stop and remove database volume

> ⚠️ This deletes the local PostgreSQL data stored in the Compose volume.

```bash
docker compose down -v
```

---

## 💻 Run Locally

### Prerequisites

Make sure you have:

- Node.js
- npm
- PostgreSQL
- Git

### 1. Create the database

Create a PostgreSQL database for the application.

```sql
CREATE DATABASE emily;
```

### 2. Configure environment variables

Copy the example environment file:

```bash
cp .env.example server/.env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example server/.env
```

Update `DATABASE_URL` if required.

### 3. Install dependencies

```bash
npm run install:all
```

### 4. Generate Prisma client

```bash
npm run prisma:generate --prefix server
```

### 5. Run database migration

```bash
npm run prisma:migrate --prefix server -- --name init
```

### 6. Seed the database

```bash
npm run prisma:seed --prefix server
```

### 7. Start the application

```bash
npm run dev
```

### 8. Open the application

Frontend:

```text
http://localhost:5173
```

API:

```text
http://localhost:4000
```

---

## 🔌 API Documentation

All successful API responses follow:

```json
{
  "data": {}
}
```

Failures follow:

```json
{
  "error": {
    "message": "Something went wrong"
  }
}
```

### Health

```http
GET /api/health
```

Returns the API health status.

### Products

```http
GET /api/products
```

Returns products including their variants and EMI plans.

### Product by slug

```http
GET /api/products/:slug
```

Example:

```http
GET /api/products/iphone-16
```

### Brands

```http
GET /api/products/brands
```

Returns available product brands.

### Variant

```http
GET /api/variants/:id
```

Returns a variant with its product and financing plans.

### Variant EMI plans

```http
GET /api/variants/:id/emi-plans
```

Returns EMI plans available for a specific variant.

---

## 🔎 Catalogue Query Parameters

The catalogue endpoint supports:

| Parameter  | Purpose                |
| ---------- | ---------------------- |
| `search`   | Search products        |
| `brand`    | Filter by brand        |
| `minPrice` | Minimum price          |
| `maxPrice` | Maximum price          |
| `sort`     | Sort catalogue results |

### Supported sorting

```text
featured
newest
price-asc
price-desc
```

### Example

```http
GET /api/products?brand=Apple&maxPrice=100000&sort=price-asc
```

### Example response

```json
{
  "data": [
    {
      "id": "...",
      "brand": "Apple",
      "name": "iPhone 16",
      "slug": "iphone-16",
      "variants": [
        {
          "storage": "128GB",
          "sellingPrice": 79900,
          "emiPlans": [
            {
              "provider": "HDFC Bank",
              "tenure": 6,
              "monthlyEmi": 13317,
              "cashback": 1000
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 🌱 Seed Data

The Prisma seed script creates **12 smartphone products** spanning flagship and mid-range categories.

### Brands represented

- Apple
- Samsung
- Google
- OnePlus
- Xiaomi
- Nothing
- Motorola
- Vivo

Each product contains:

- **2 purchasable configurations**
- Variant-specific pricing
- Variant-specific colours/storage
- Variant image sets
- **4 EMI plans per configuration**
- 3, 6, 9 and 12 month tenure options

This provides a realistic catalogue for testing product discovery and financing flows.

---

## ☁️ AWS Deployment

The repository is **AWS deployment-ready at the container architecture level**, but does **not claim a live AWS deployment**.

A production deployment can follow this architecture:

```text
                         Internet
                            │
                            ▼
                  ┌──────────────────┐
                  │ Application Load │
                  │    Balancer      │
                  └────────┬─────────┘
                           │ HTTPS
                           ▼
              ┌──────────────────────────┐
              │       ECS Fargate        │
              │                          │
              │  ┌────────┐ ┌────────┐  │
              │  │ Nginx  │ │  API   │  │
              │  │ Client │ │ Express│  │
              │  └────────┘ └────┬───┘  │
              └──────────────────┼───────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
              AWS Secrets               Amazon RDS
              Manager                    PostgreSQL
```

### Recommended AWS components

| Component          | AWS Service                   |
| ------------------ | ----------------------------- |
| Container registry | Amazon ECR                    |
| Web/API containers | ECS Fargate                   |
| Database           | Amazon RDS for PostgreSQL     |
| Secrets            | AWS Secrets Manager           |
| Load balancing     | Application Load Balancer     |
| HTTPS              | AWS Certificate Manager (ACM) |

### Deployment outline

1. Build the `client` and `server` images.
2. Push both images to Amazon ECR.
3. Create ECS Fargate services for the web and API containers.
4. Provision PostgreSQL with Amazon RDS.
5. Store `DATABASE_URL` in AWS Secrets Manager.
6. Configure ECS networking and security groups.
7. Put an Application Load Balancer in front of the web service.
8. Attach an HTTPS ACM certificate.
9. Configure the API and database connectivity.
10. Run Prisma migrations/seed as part of the deployment process where appropriate.

> A live AWS environment is intentionally not included because deployment requires an AWS account, region, networking configuration, IAM permissions, secrets, domain/DNS configuration, and deployment credentials.

---

## ⚙️ Environment Variables

The backend requires a PostgreSQL connection string.

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/emily"
```

For a local frontend pointing to a different API, create:

```text
client/.env
```

with:

```env
VITE_API_URL=http://localhost:4000/api
```

> Never commit real credentials, API keys, database passwords, or production secrets. Commit `.env.example` with placeholder values instead.

---

## 🧪 Development Notes

The client intentionally does **not** hardcode catalogue data.

```text
React UI
   ↓
src/lib/api.js
   ↓
REST API
   ↓
Product Service
   ↓
Prisma
   ↓
PostgreSQL
```

The backend uses:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Prisma
```

Input validation is handled with **Zod**, while centralized error middleware provides consistent HTTP error responses.

---

## 🧠 Engineering Decisions

### Variant-level financing

EMI plans are associated with variants rather than only products. This prevents financing data from becoming detached from the exact configuration a customer wants to purchase.

### Service layer

Product searching and filtering live in the service layer rather than directly inside route handlers. This keeps controllers thin and makes business logic easier to maintain.

### API boundary

The frontend communicates with the catalogue through `src/lib/api.js`, keeping API communication separate from presentation components.

### Containerized production stack

Docker Compose packages the database, API and production frontend into a repeatable environment that can be moved toward cloud deployment without changing the application's fundamental architecture.

---

## 🛡️ Security Notes

Before deploying to production:

- Store secrets in AWS Secrets Manager or an equivalent secret manager.
- Do not commit `.env` files containing real credentials.
- Use HTTPS in production.
- Restrict PostgreSQL network access to the application layer.
- Configure appropriate CORS rules.
- Use least-privilege IAM roles for AWS services.
- Rotate production secrets regularly.
- Keep production dependencies updated.

---

## 🐛 Troubleshooting

### Docker is not running

Make sure Docker Desktop is running, then:

```bash
docker compose up --build
```

### Database connection fails

Check:

```env
DATABASE_URL
```

and verify that PostgreSQL is reachable.

For Docker:

```bash
docker compose ps
```

### Prisma client is missing

Run:

```bash
npm run prisma:generate --prefix server
```

### Database has no products

Run:

```bash
npm run prisma:seed --prefix server
```

or:

```bash
docker compose exec api npm run prisma:seed
```

### Frontend cannot reach the API

Verify the API is running on:

```text
http://localhost:4000
```

For a custom API URL, configure:

```env
VITE_API_URL=http://localhost:4000/api
```

---

## 📌 Project Status

| Area                       | Status         |
| -------------------------- | -------------- |
| React frontend             | ✅ Complete    |
| REST API                   | ✅ Complete    |
| PostgreSQL + Prisma        | ✅ Complete    |
| Product/variant catalogue  | ✅ Complete    |
| EMI plans                  | ✅ Complete    |
| Docker Compose             | ✅ Ready       |
| AWS container architecture | ✅ Documented  |
| Live AWS deployment        | ⏳ Not claimed |

---

## 👨‍💻 Author

**EMIly — Fintech Smartphone Marketplace**

Built as a full-stack engineering project demonstrating:

**React + Node.js + Express + PostgreSQL + Prisma + Docker + AWS deployment architecture**

---

<p align="center">
  <strong>EMIly — Making smartphone financing easier to understand.</strong>
</p>
