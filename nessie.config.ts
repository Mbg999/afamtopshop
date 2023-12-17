import { ClientMySQL, NessieConfig } from "./deps.ts";
import { DBConnectionMySql } from "./persistence/db-connection-mysql.ts";
const client = new ClientMySQL(DBConnectionMySql.MYSQL_CONFIG);

/** This is the final config object */
const config: NessieConfig = {
  client,
  migrationFolders: ["./persistence/migrations/mysql"],
  seedFolders: ["./persistence/seeds/mysql"],
};

export default config;
