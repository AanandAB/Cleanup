// Generates seed-admin.sql with a PBKDF2-hashed admin user.
// Run: node scripts/gen-admin-sql.cjs [password]
const { pbkdf2Sync, randomBytes, randomUUID } = require("node:crypto");
const fs = require("node:fs");

const password = process.argv[2] || "admin123";
const salt = randomBytes(16);
const key = pbkdf2Sync(password, salt, 100000, 32, "sha256");
const b64url = (b) =>
  b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const hash = `pbkdf2$100000$${b64url(salt)}$${b64url(key)}`;
const id = randomUUID();
const sql =
  `INSERT INTO admins (id, username, password_hash, role, created_at) ` +
  `VALUES ('${id}', 'admin', '${hash}', 'admin', unixepoch());`;
fs.writeFileSync("seed-admin.sql", sql);
console.log("wrote seed-admin.sql (admin / " + password + ")");
