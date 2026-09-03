# 📱 EMIly — Fintech Smartphone Marketplace

<p align="center">
  <strong>A modern full-stack smartphone marketplace built around transparent EMI financing.</strong>
</p>

<p align="center">
  Product Discovery • Variant Pricing • EMI Plans • REST API • PostgreSQL • Docker • AWS Ready
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-Ready-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

</p>

---

## 📸 Project Preview

> Replace the image below with an actual screenshot of the application once available.

<p align="center">
  <img 
    src="https://placehold.co/1200x650/png?text=EMIly+%E2%80%94+Smartphone+Marketplace" 
    alt="EMIly Smartphone Marketplace"
    width="100%"
  >
</p>

---

## 🚀 Overview

**EMIly** is a responsive, full-stack smartphone marketplace designed to make installment-based smartphone shopping simple, transparent, and easy to understand.

The platform allows users to:

- Browse smartphones
- Search and filter products
- Select specific product configurations
- View configuration-specific pricing
- Explore product images
- Compare EMI plans from different lenders
- View different EMI tenures
- See cashback information

The application uses a structured PostgreSQL database where **products, variants, prices, images, and EMI plans are connected through Prisma ORM**.

The React frontend communicates with the backend exclusively through a REST API, keeping the UI independent from the database layer.

---

# ✨ Features

## 🛍️ Customer Features

| Feature | Description |
|---|---|
| 📱 Smartphone Catalogue | Browse flagship and mid-range smartphones |
| 🔍 Search | Search products by relevant catalogue information |
| 🏷️ Brand Filter | Filter smartphones by brand |
| 💰 Price Filter | Filter products using minimum and maximum price |
| ↕️ Sorting | Sort by featured, newest, lowest price or highest price |
| 🎨 Product Variants | Select storage, colour and configuration |
| 🖼️ Product Images | Variant-specific product image sets |
| 🏦 EMI Plans | View lender-specific EMI options |
| 📅 Multiple Tenures | 3, 6, 9 and 12 month EMI plans |
| 💸 Cashback | Display cashback associated with EMI plans |
| 📱 Responsive UI | Optimized for desktop and mobile |

---

## ⚙️ Engineering Features

- React 19
- Vite
- Tailwind CSS
- React Router
- Node.js
- Express.js
- Zod validation
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- Nginx production frontend
- Centralized API error handling
- AWS-ready container architecture

---

# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Backend | Node.js + Express |
| Validation | Zod |
| ORM | Prisma |
| Database | PostgreSQL |
| Production Web Server | Nginx |
| Containerization | Docker + Docker Compose |
| Container Registry | Amazon ECR |
| Cloud Compute | AWS ECS Fargate |
| Cloud Database | Amazon RDS |
| Secrets | AWS Secrets Manager |
| Load Balancer | Application Load Balancer |
| HTTPS | AWS Certificate Manager |

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         │                      │
                         │ React 19 + Vite      │
                         │ Tailwind + Router    │
                         └──────────┬───────────┘
                                    │
                              REST / JSON
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     Express API      │
                         │                      │
                         │ Routes               │
                         │ Controllers          │
                         │ Services             │
                         │ Zod Validation       │
                         │ Error Middleware     │
                         └──────────┬───────────┘
                                    │
                                 Prisma
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     PostgreSQL       │
                         │                      │
                         │ Product              │
                         │ Variant              │
                         │ EMI Plans            │
                         │ Images               │
                         └──────────────────────┘