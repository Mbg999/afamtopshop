import { Client, ClientConfig } from "../deps.ts";

export abstract class DB {
  private static SINGLE_CONNECTION: Client | undefined;
  static MYSQL_CONFIG: ClientConfig = {
    hostname: "127.0.0.1",
    username: "root",
    db: "afamtopshop",
    password: "",
  };

  static async getConnection() {
    if (DB.SINGLE_CONNECTION) {
      return DB.SINGLE_CONNECTION;
    } else {
      DB.SINGLE_CONNECTION = await new Client().connect(DB.MYSQL_CONFIG);
      return DB.SINGLE_CONNECTION;
    }
  }

  static closeConnection() {
    if (DB.SINGLE_CONNECTION) {
      DB.SINGLE_CONNECTION.close().finally(() => {
        console.log("DB FINALLY CLOSE LLEGA");
        DB.SINGLE_CONNECTION = undefined;
      });
    }
  }
}
