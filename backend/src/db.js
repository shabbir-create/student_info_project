const path = require("node:path");
const fs = require("node:fs");

const driver =
  process.env.PORTAL_DB ||
  (process.env.RENDER === "true" || !process.env.MYSQLHOST
    ? "sqlite"
    : "mysql");
const roll = process.env.ROLL_NUMBER || "1234";
if (!/^\d+$/.test(roll))
  throw new Error("ROLL_NUMBER must contain only digits.");

function openSqlite() {
  if (roll !== "1234")
    throw new Error("The SQLite sample database uses roll number 1234.");
  const { DatabaseSync } = require("node:sqlite");
  const location =
    process.env.SQLITE_PATH || path.resolve(__dirname, "../data/portal.sqlite");
  fs.mkdirSync(path.dirname(location), { recursive: true });
  const db = new DatabaseSync(location);
  db.exec(
    "PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL; BEGIN IMMEDIATE;",
  );
  try {
    if (db.prepare("PRAGMA user_version").get().user_version === 0) {
      db.exec(fs.readFileSync(path.join(__dirname, "seed.sqlite.sql"), "utf8"));
      db.exec("PRAGMA user_version=1");
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  return {
    roll,
    storageNotice:
      process.env.RENDER === "true" && !process.env.SQLITE_PATH
        ? "This shared demo uses temporary storage. Export your activities to keep a copy before the host restarts."
        : null,
    rows: (sql, params = []) => db.prepare(sql).all(...params),
    write(sql, params) {
      const result = db.prepare(sql).run(...params);
      return {
        affectedRows: result.changes,
        insertId: Number(result.lastInsertRowid),
      };
    },
  };
}

function openMysql() {
  const pool = require("mysql2/promise").createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    ssl: process.env.MYSQL_SSL_CA
      ? {
          ca: process.env.MYSQL_SSL_CA.replace(/\\n/g, "\n"),
          rejectUnauthorized: true,
          verifyIdentity: true,
        }
      : undefined,
    dateStrings: ["DATE"],
    waitForConnections: true,
    connectionLimit: 10,
  });
  async function query(sql, params) {
    const [result] = await pool.execute(sql, params);
    return result;
  }
  return { roll, rows: query, write: query, storageNotice: null };
}

if (!["mysql", "sqlite"].includes(driver))
  throw new Error("PORTAL_DB must be mysql or sqlite.");
module.exports = driver === "sqlite" ? openSqlite() : openMysql();
