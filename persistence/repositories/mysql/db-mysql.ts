import { Client, ClientConfig } from "../../../deps.ts";
import { DBBase } from "../db-base.ts";

export class DBMySql extends DBBase<Client, ClientConfig> {
  private static SINGLETON_CONNECTION: Client | undefined;

  constructor() {
    super({
      hostname: "127.0.0.1",
      username: "root",
      db: "afamtopshop",
      password: "",
    }, "mysql");
  }

  async getConnection() {
    if (DBMySql.SINGLETON_CONNECTION) {
      return DBMySql.SINGLETON_CONNECTION;
    } else {
      console.log(this.CONFIG);
      DBMySql.SINGLETON_CONNECTION = await new Client().connect(
        this.CONFIG,
      );
      return DBMySql.SINGLETON_CONNECTION;
    }
  }

  closeConnection() {
    if (DBMySql.SINGLETON_CONNECTION) {
      DBMySql.SINGLETON_CONNECTION.close().finally(() => {
        console.log("DB FINALLY CLOSE");
        DBMySql.SINGLETON_CONNECTION = undefined;
      });
    }
  }
}
