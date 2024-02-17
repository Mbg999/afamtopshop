import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { ProductTag } from "../../../domain/product-tag.ts";
import { DBMySql } from "./db-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ProductTagRepository } from "../product-tag.repository.ts";

export class MySQLProductTagRepository extends ProductTagRepository<DBMySql> {
  constructor() {
    super(new DBMySql());
  }

  async getAllFromMultipleProducts(
    productIds: string[],
  ): Promise<ProductTag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      `SELECT pt.*, t.name as tagName FROM product_tag pt JOIN tags t ON t.id LIKE pt.tagId WHERE pt.productId IN (${
        "?,".repeat(productIds.length).slice(0, -1)
      })`,
      productIds,
    ).catch((error) => {
      MySQLProductTagRepository.logError("getAllFromMultipleProducts", error);
      return error;
    });
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
      "SELECT pt.*, t.name as tagName FROM product_tag pt JOIN tags t ON t.id LIKE pt.tagId WHERE pt.productId LIKE ?",
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
