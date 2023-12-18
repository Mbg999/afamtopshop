import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { Shop } from "../../../domain/shop.ts";
import { DBMySql } from "./db-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ShopRepository } from "../shop.repository.ts";

export class MySQLShopRepository extends ShopRepository<DBMySql> {
  constructor() {
    super(new DBMySql());
  }

  async getAll(): Promise<Shop[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM shops").catch((error) => {
      MySQLShopRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<Shop> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM shops WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLShopRepository.logError("getById", error);
      return error;
    });
  }

  async create(
    item: Omit<Shop, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO shops (id, name) VALUES (?, ?)",
      [
        id,
        item.name,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLShopRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<Shop, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE shops SET name = ? WHERE id like ?",
      [
        item.name,
        item.id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLShopRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM shops WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLShopRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-shop.repository", methodName, error);
  }
}
