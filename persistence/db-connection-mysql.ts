import { Client, ClientConfig } from "../deps.ts";
import { DBConnectionBase } from "./db-connection-base.ts";

export class DBConnectionMySql extends DBConnectionBase<Client, ClientConfig> {
  private static SINGLETON_CONNECTION: Client | undefined;
  static MYSQL_CONFIG: ClientConfig = {
    hostname: "127.0.0.1",
    username: "root",
    db: "afamtopshop",
    password: "",
  };

  constructor() {
    super(DBConnectionMySql.MYSQL_CONFIG);
  }

  async getConnection() {
    if (DBConnectionMySql.SINGLETON_CONNECTION) {
      return DBConnectionMySql.SINGLETON_CONNECTION;
    } else {
      console.log(this.CONFIG);
      DBConnectionMySql.SINGLETON_CONNECTION = await new Client().connect(
        this.CONFIG,
      );
      return DBConnectionMySql.SINGLETON_CONNECTION;
    }
  }

  closeConnection() {
    if (DBConnectionMySql.SINGLETON_CONNECTION) {
      DBConnectionMySql.SINGLETON_CONNECTION.close().finally(() => {
        console.log("DB FINALLY CLOSE LLEGA");
        DBConnectionMySql.SINGLETON_CONNECTION = undefined;
      });
    }
  }
}
