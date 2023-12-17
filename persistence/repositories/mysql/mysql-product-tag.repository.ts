import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { ProductTag } from "../../../domain/product-tag.model.ts";
import { DBConnectionMySql } from "../../db-connection-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ProductTagRepository } from "../product-tag.repository.ts";

export class MySQLProductTagRepository
  extends ProductTagRepository<DBConnectionMySql> {
  constructor() {
    super(new DBConnectionMySql());
  }

  async getProductsFromTagId(tagId: string): Promise<ProductTag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      "SELECT * FROM product_tag WHERE tagId LIKE ?",
      [tagId],
    ).catch((error) => {
      MySQLProductTagRepository.logError("getProductsFromTagId", error);
      return error;
    });
  }

  async getTagsFromProductId(productId: string): Promise<ProductTag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      "SELECT * FROM product_tag WHERE productId LIKE ?",
      [productId],
    ).catch((error) => {
      MySQLProductTagRepository.logError("getTagsFromProductId", error);
      return error;
    });
  }

  async getAll(): Promise<ProductTag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM product_tag").catch((error) => {
      MySQLProductTagRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<ProductTag> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM product_tag WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLProductTagRepository.logError("getById", error);
      return error;
    });
  }

  async create(
    item: Omit<ProductTag, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO product_tag (id, productId, tagId) VALUES (?, ?, ?)",
      [
        id,
        item.productId,
        item.tagId,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLProductTagRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<ProductTag, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE product_tag SET productId = ?, tagId = ? WHERE id like ?",
      [
        item.productId,
        item.tagId,
        item.id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLProductTagRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM product_tag WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLProductTagRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-product-tag.repository", methodName, error);
  }
}
