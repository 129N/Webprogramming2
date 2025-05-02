## CryptoCurrency Tracking Dashboard

Everything you need to build a Svelte library, powered by [`sv`](https://npmjs.com/package/sv).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

##Overview
Real-time cryptocurrency tracker with user auth built with:

SvelteKit + TypeScript

SQLite3 database

Tailwind CSS

CurrencyAPI
BitcoinAPI
ETHAPI


## Key Features:

Live BTC/ETH price updates

Secure authentication

Responsive UI

**Tech Stack**:
 Frontend: SvelteKit + TypeScript
- Backend: SvelteKit API routes
- Database: SQLite3 (for user data)
- Styling: Tailwind CSS (or your framework)
- Icons: Iconify


## Project Structure

### 1. `/src/components`
(^) Reusable UI components following Svelte best practices:

- **Core Components**:
  - `Header.svelte`: Responsive navigation bar with auth state
  - `Footer.svelte`: Standard footer with project info
  - `Sidebar.svelte`: Context-aware navigation panel

- **API Services**:
  - `crypto.ts`: Handles all cryptocurrency data fetching
    - Fetches real-time prices
    - Manages update intervals
    - Error handling
  - `auth.ts`: Authentication logic
    - JWT token management
    - User session handling
    - Protected route validation

 - **UI Components**:
  - `PriceChart.svelte`: Interactive price visualization
  

### 2. `/src/routes`
 File-system based routing with SvelteKit conventions:

- **Authentication** (`/(auth)`):
  - `login/+page.svelte`: Secure login interface
  - `signup/+page.svelte`: User registration flow

- **Cryptocurrency Pages**:
  - `/bitcoin/+page.svelte`: 
    - BTC/USD price tracking
    - Historical data visualization
    - Market trend indicators
  - `/ethereum/+page.svelte`:
    - ETH/USD price tracking
    - Comparative analytics
    - News integration

- **Core Pages**:
  - `/+page.svelte`: Dashboard homepage
    - Market overview
    - Quick access to major currencies
    - User greeting (when authenticated)


### 3. Database Schema

SQLite Setup:
Creates userDB.db if missing
users(id, username, password_hash)
sessions(id, user_id, expires_at)

Provides:

hashPassword() : Hashes a password using Argon2id 

verifyPassword() :Compares a plaintext password against its hashed version.


Tables:
1: users 
id: Auto-incrementing primary key.
username: Unique, non-nullable.
password_hash: Stores Argon2id-hashed passwords.

2: sessions 
id: Session identifier (stored in cookies).
user_id: Foreign key linked to users.id.
expires_at: Session expiration timestamp.

How It Works
Login Flow

User submits credentials → Password is hashed and compared with the database.

On success:

A session is created in the sessions table.

A session_id cookie is set in the response.

Session Validation

Every request checks for a valid session_id cookie.

If valid, event.locals.user is populated with:



Delete the session from the database and clear the cookie.




## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

