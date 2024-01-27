import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { Product } from "../../../domain/product.ts";
import { DBMySql } from "./db-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ProductRepository } from "../product.repository.ts";

export class MySQLProductRepository extends ProductRepository<DBMySql> {
  constructor() {
    super(new DBMySql());
  }

  async searchByName(name: string): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM products WHERE name LIKE ?", [
      `%${name}%`,
    ]).catch((error) => {
      MySQLProductRepository.logError("searchByName", error);
      throw error;
    });
  }

  async getAll(): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM products").catch((error) => {
      MySQLProductRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<Product> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM products WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLProductRepository.logError("getById", error);
      return error;
    });
  }

  async create(
    item: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO products (id, name, description, categoryId) VALUES (?, ?, ?, ?)",
      [
        id,
        item.name,
        item.description,
        item.categoryId,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLProductRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<Product, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE products SET name = ?, description = ?, categoryId = ? WHERE id like ?",
      [
        item.name,
        item.description,
        item.categoryId,
        item.id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLProductRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM products WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLProductRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-product.repository", methodName, error);
  }
}
