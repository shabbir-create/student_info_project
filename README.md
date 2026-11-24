# Student Information Portal

React, Express and SQL power a shared student demo for roll 1234. Open [the portal](https://student-info-project.vercel.app/) and choose **Open demo workspace**, or enter roll `1234` and password `Secure@1234`. The demo gate is for navigation. The shared API is public.

## Run locally

Use Node 22.13+ or Node 24. From the repository root run `npm run install:all`, then `npm run start:prod`. Open `http://localhost:4000`. SQLite initializes the supplied sample profile, subjects and activities once. It stores changes in `backend/data/portal.sqlite`. For frontend development, run `npm start` and `npm run dev --prefix frontend` in separate terminals.

## Deployment

Vercel builds the frontend and forwards `/api/*` to the Express service on Render. The Vercel configuration supports both the repository root and the frontend directory as the project root. Render can run from the backend directory with `npm ci` and `npm start`.

On Render the default database is SQLite. With the default ephemeral filesystem, records survive a page refresh but can reset when the service restarts or redeploys. Use **Export** in the planner to download all current activities. For durable SQLite storage, mount a persistent disk and set `SQLITE_PATH` to a database file on that disk. Moving to a new file initializes a fresh sample dataset unless an existing SQLite backup is restored there.

## MySQL

Set `PORTAL_DB=mysql` to use a durable MySQL database. Copy `backend/.env.example` to `backend/.env` locally, or set its MySQL values in the host environment. For Aiven, supply the project CA in `MYSQL_SSL_CA`. Point `MYSQLDATABASE` at your existing populated database or import `sql/schema_1234.sql` once into a new database. Switching drivers selects a different database. Records are not synchronized between SQLite and MySQL.

The service checks for SQLite schema initialization within a transaction. A temporary MySQL outage returns an error until connectivity recovers. Check `/api/1234/student` and `/api/1234/activities` for live data, and `/health` for process availability.
