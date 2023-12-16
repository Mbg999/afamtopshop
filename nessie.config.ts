import { ClientMySQL, NessieConfig } from "./deps.ts";
import { DB } from "./db/db.ts";
const client = new ClientMySQL(DB.MYSQL_CONFIG);

/** This is the final config object */
const config: NessieConfig = {
  client,
  migrationFolders: ["./db/migrations"],
  seedFolders: ["./db/seeds"],
};

export default config;
