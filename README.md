# Globizora API

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-API-blue?logo=stripe)](https://stripe.com/)
[![Swagger](https://img.shields.io/badge/Docs-Swagger_UI-green?logo=swagger)](http://localhost:3000/docs)

**Globizora API** is a production-ready **Express.js backend** that provides:
- 🔑 111JWT authentication & API key management  
- 📦 MongoDB integration (Mongoose ODM)  
- 💳 Stripe Checkout subscription support  
- 📊 API usage tracking & server metrics  
- 📜 Interactive Swagger UI documentation  

---

## ✨ Features
- **Auth**: User registration/login with JWT, hashed passwords  
- **API Keys**: Generate unique keys per user  
- **Stripe Integration**: Plans (`free`, `pro`, `enterprise`) with Checkout Sessions & Webhooks  
- **Data Endpoints**: Company info, mock analytics data  
- **Contact Form**: Validated input endpoint  
- **Swagger Docs**: Built-in interactive API docs  
- **Metrics**: Users count, memory, DB status  

---

## 📂 Project Structure
```
globizora-api/
├─ src/
│  ├─ app.js               
│  ├─ routes/
│  │  ├─ health.js          # /healthz & /readyz
│  │  └─ stripe-webhook.js  # /webhooks/stripe
│  ├─ middleware/
│  │  ├─ security.js        # helmet/CSP/cors/hpp/xss-clean 
│  │  ├─ rate-limit.js      # IP + API Key 
│  │  └─ validate.js        
│  ├─ utils/
│  │  ├─ env.js             # envalid env
│  │  └─ logger.js          # pino & request-id
│  └─ server.js             
├─ .github/workflows/ci.yml # Lint+Test+Build
├─ SECURITY.md
├─ SUPPORT.md
├─ Dockerfile
├─ docker-compose.yml
└─ .env.example

```

---

## 🚀 Quick Start

### 1) Clone & Install
```bash
git clone https://github.com/Globizora/globizora-api.git
cd globizora-api
npm install
```

### 2) Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database
MONGO_URL=mongodb://localhost:27017/globizora

# Auth
JWT_SECRET=your_long_secret_string

# CORS 
ALLOW_ORIGINS=http://localhost:3000,https://globizora.com

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Logs & Rate limits
LOG_LEVEL=info
RATE_LIMIT_IP_RPS=10    
RATE_LIMIT_KEY_RPS=5     

```

### 3) Start MongoDB
- **Local install**: MongoDB server running on `localhost:27017`
- **Or via Docker**:
```bash
docker compose up -d mongo
```

### 4) Run API
```bash
npm run dev    # Development with nodemon
# OR
node src/app.js
node src/server.js
```

---

## 🧪 API Examples

### Register
```bash
curl -X POST http://localhost:3000/auth/register   -H "Content-Type: application/json"   -d '{ "username":"demo", "email":"demo@example.com", "password":"secret123" }'
```
## API Docs
```bash
{
  "error": "validation_error",
  "details": [{ "path": ["email"], "message": "Invalid email" }]
}
```
### Login
```bash
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{ "email":"demo@example.com", "password":"secret123" }'
```

### Protected Endpoint
```bash
curl http://localhost:3000/users   -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📖 Documentation

Swagger UI is available at:  
👉 http://localhost:3000/docs

It lets you explore and test all endpoints (auth, users, API keys, Stripe subscriptions, webhooks).

![Swagger Screenshot](.github/assets/swagger-ui.png)  
*Example: Globizora API Swagger UI.*

---

## 🐳 Docker Deployment
```bash
docker build -t globizora-api .
docker run --env-file .env -p 3000:3000 globizora-api
```

---

## 📊 Roadmap
- [ ] Role-based access control (RBAC)  
- [ ] Stripe metered billing  
- [ ] Admin dashboard (Next.js)  
- [ ] Cloud deployment on AWS/GCP  

---

## 📜 License
MIT © 2025 [Globizora Inc](https://globizora.com)
