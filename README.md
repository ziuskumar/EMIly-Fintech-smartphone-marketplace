# EMIly — Fintech smartphone marketplace

EMIly is a responsive, full-stack smartphone shop that makes installment buying clear: products, configurations, images, pricing, and lender plans are all served from PostgreSQL through a REST API.

## Containerization and AWS deployment

The application is **containerized** with a production Docker Compose stack: PostgreSQL, the Express/Prisma API, and an Nginx-served React build. Run the full stack with:

```bash
docker compose up --build
```

The shop will be available at `http://localhost:8080`. On first launch, seed the catalogue in the API container:

```bash
docker compose exec api npm run prisma:seed
```

The included Dockerfiles are ready for AWS deployment. For a production AWS deployment, publish the `client` and `server` images to Amazon ECR, run API and web containers on ECS Fargate, provision PostgreSQL with Amazon RDS, and configure the API's `DATABASE_URL` through AWS Secrets Manager. Place an Application Load Balancer in front of the web service and use an HTTPS ACM certificate. A live AWS deployment is not claimed here because it requires an AWS account, region, networking choices, and deployment credentials.

## Stack

- **Client:** React 19, Vite, Tailwind CSS, React Router
- **Server:** Node.js, Express, Zod validation
- **Data:** PostgreSQL, Prisma ORM

## Run locally

1. Create a PostgreSQL database named ``.
2. Copy `.env.example` to `server/.env` and update `DATABASE_URL` if required.
3. Install packages: `npm run install:all`.
4. Generate/migrate the database:

   ```bash
   npm run prisma:generate --prefix server
   npm run prisma:migrate --prefix server -- --name init
   npm run prisma:seed --prefix server
   ```

5. Start both applications: `npm run dev`.
6. Visit `http://localhost:5173`; the API runs on `http://localhost:4000`.

To point the client at another API, create `client/.env` with `VITE_API_URL=http://localhost:4000/api`.

## Architecture

`client/src/pages` owns route-level views, while `components` contains reusable layout and product-card UI. The client only requests product data through `src/lib/api.js`; no catalog content is hardcoded in React.

The Express app follows routes → controllers → services → Prisma. Product searching/filtering is encapsulated in `product.service.js`, input is validated using Zod, and one error middleware produces consistent HTTP errors.

Data model: a **Product** has many **Variants**; each variant owns its price, colour, storage, image set, and many **EmiPlans**. This keeps a selected configuration’s price and finance options together and allows plans to differ by variant.

## API documentation

All responses use `{ "data": ... }`; failures use `{ "error": { "message": "..." } }`.

| Method | Endpoint                      | Description                                     |
| ------ | ----------------------------- | ----------------------------------------------- |
| GET    | `/api/health`                 | API health status                               |
| GET    | `/api/products`               | List products, including variants and EMI plans |
| GET    | `/api/products/:slug`         | Get a product by unique URL slug                |
| GET    | `/api/products/brands`        | List available brands                           |
| GET    | `/api/variants/:id`           | Get variant with product and plans              |
| GET    | `/api/variants/:id/emi-plans` | Get plans for a variant                         |

### Catalogue query parameters

`search`, `brand`, `minPrice`, `maxPrice`, and `sort` are supported. `sort` accepts `featured`, `newest`, `price-asc`, or `price-desc`.

```http
GET /api/products?brand=Apple&maxPrice=100000&sort=price-asc
```

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

## Seed data

The Prisma seed script creates 12 current flagship and mid-range phones across Apple, Samsung, Google, OnePlus, Xiaomi, Nothing, Motorola, and Vivo. Every product has two purchasable configurations and each configuration has four EMI plans (3, 6, 9, and 12 month tenure options).
