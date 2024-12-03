import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "db",
      database: process.env.DB_NAME || "siscarim",
      user: process.env.DB_USER || "siscarim",
      password: process.env.DB_PASSWORD || "siscarim123",
      port: process.env.DB_PORT || 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: join(__dirname, "../migrations"),
      tableName: "knex_migrations",
      extension: "js",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: join(__dirname, "../migrations"),
      tableName: "knex_migrations",
      extension: "js",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: join(__dirname, "../migrations"),
      tableName: "knex_migrations",
      extension: "js",
    },
  },
};

export default config;
