import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { Image } from "../../../domain/image.ts";
import { DBMySql } from "./db-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ImageRepository } from "../image.repository.ts";

export class MySQLImageRepository extends ImageRepository<DBMySql> {
  constructor() {
    super(new DBMySql());
  }

  async getImagesFromAProduct(productId: string): Promise<Image[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      "SELECT * FROM images WHERE productId LIKE ?",
      [productId],
    ).catch((error) => {
      MySQLImageRepository.logError("getAll", error);
      return error;
    });
  }

  async getAll(): Promise<Image[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM images").catch((error) => {
      MySQLImageRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<Image> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM images WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLImageRepository.logError("getById", error);
      return error;
    });
  }

  async create(
    item: Omit<Image, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO images (id, productId, name, url) VALUES (?, ?, ?, ?)",
      [
        id,
        item.productId,
        item.name,
        item.url,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLImageRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<Image, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE images SET productId = ?, name = ?, url = ? WHERE id like ?",
      [
        item.productId,
        item.name,
        item.url,
        item.id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLImageRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM images WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLImageRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-image.repository", methodName, error);
  }
}
