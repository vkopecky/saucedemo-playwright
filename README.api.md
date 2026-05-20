# API Test Suite – reqres.in

## ⚠️ Required: Free API key

reqres.in changed their model and now requires an API key even for free/basic endpoints.
**Registration is free, no credit card needed.**

### Steps to get your key (≈2 minutes)

1. Open **https://app.reqres.in/register** in your browser
2. Create a free account
3. After login, go to **https://app.reqres.in/api-keys**
4. Click **"Create API Key"** → copy the key
5. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
6. Open `.env` and replace `your_free_key_here` with your key:
   ```
   REQRES_API_KEY=reqres_live_XXXXXXXXXX
   ```

---

## Running the tests

```bash
# Run all API tests
npm run api

# Open the HTML report after the run
npm run api:report
```

---

## Test Cases

| # | File | Endpoint | Description |
|---|------|----------|-------------|
| TC1 | `tests/api/tc1-list-users.spec.js` | `GET /api/users?page=2` | Assert total=12, last_names of user 1 & 2, data count ≤ total, bonus data-type checks |
| TC2 | `tests/api/tc2-create-user.spec.js` | `POST /api/users` | Assert HTTP 201, id presence, createdAt timestamp, echoed name/job, response time < 100 ms |

---

## Test data (TC2)

TC2 is **data-driven** using **@faker-js/faker** (fixed seed = 42) as an external data source.
Data lives in `tests/api/test-data/create-user.data.js`.
Three synthetic users are generated and each gets its own test case.

---

## Project structure

```
tests/api/
├── tc1-list-users.spec.js          ← TC1: GET List Users
├── tc2-create-user.spec.js         ← TC2: POST Create User
├── helpers/
│   └── http-client.js              ← custom IPv4-forced HTTP helper (fallback)
└── test-data/
    └── create-user.data.js         ← external Faker data source

playwright.api.config.cjs           ← Playwright config for API tests
.env.example                        ← template for environment variables
.env                                ← YOUR local secrets (not committed to git)
```
