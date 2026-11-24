# Student Information Portal (Roll No: 1234)

Full-stack assignment project using React SPA + Express API + MySQL.

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and enter your MySQL connection details.
2. For a new database, import `sql/schema_1234.sql` once. It creates and selects `student_portal_1234` and adds the sample records. For an existing populated database, use its name in `MYSQLDATABASE`.
3. From the repository root, run `npm run install:all`, then `npm run start:prod`.
4. Open `http://localhost:4000`. During frontend development, start the backend and run `npm run dev --prefix frontend` in a second terminal. Vite proxies `/api` to the local backend on port 4000.

## Deploy the existing portal

1. In Aiven, open the MySQL service overview. Confirm the service is running and copy its current connection information. If the service was powered off, use **Actions → Power on** and wait until it is running. If the service has been replaced, restore the existing data from backup or initialize a fresh assignment database with the supplied schema.
2. In Render, use the `backend` root directory, `npm ci` build command, and `npm start` start command. Set `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, and `MYSQLDATABASE` in the service environment. Set `MYSQL_SSL_CA` to the Aiven project CA certificate in PEM format. Redeploy.
3. Open `https://student-info-project.onrender.com/api/1234/student` and `https://student-info-project.onrender.com/api/1234/activities`. Both should return HTTP 200 and JSON. The separate `/health` route checks only that Express is running.
4. In Vercel, use the `frontend` root directory, Vite preset, `npm ci` install command, `npm run build` build command, and `dist` output directory. Deploy the updated source. The rules in `frontend/vercel.json` forward API calls to Render and serve the app for direct page visits. If Vercel uses the repository root, the top-level `vercel.json` provides the equivalent build and routing settings. If the Render URL changes, update both configurations.
5. Open `https://student-info-project.vercel.app/student`, sign in, and confirm that the student profile loads. Check that `/academic` shows subjects and the Home page lists activities.

If Render logs `ENOTFOUND`, compare `MYSQLHOST` with Aiven’s current **Host** value. Use the hostname alone and put the port in `MYSQLPORT`. If requests report a missing table, check that `MYSQLDATABASE` points to the database containing the assignment tables.

## Login
- Username: `1234`
- Password: `Secure@1234`
