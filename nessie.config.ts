import { ClientMySQL, NessieConfig } from "./deps.ts";
import { dbImpl } from "./persistence/repositories/repositories.impl.ts";
const db = dbImpl();
const client = new ClientMySQL(db.CONFIG);

/** This is the final config object */
const config: NessieConfig = {
  client,
  migrationFolders: [`./persistence/migrations/${db.FOLDER}`],
  seedFolders: [`./persistence/seeds/${db.FOLDER}`],
};

export default config;
