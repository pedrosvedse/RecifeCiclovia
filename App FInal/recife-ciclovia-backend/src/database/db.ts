import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

// Cria a pasta data/ ANTES de tentar abrir o banco
const dataDir = path.resolve(__dirname, "../../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "historico.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS historico (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    lat         REAL    NOT NULL,
    lng         REAL    NOT NULL,
    ciclovia_id TEXT    NOT NULL,
    nome        TEXT    NOT NULL,
    distancia_m REAL    NOT NULL,
    timestamp   TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
  )
`);

export default db;