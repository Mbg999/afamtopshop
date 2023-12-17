import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { Category } from "../../../domain/category.ts";
import { DBConnectionMySql } from "../../db-connection-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { CategoryRepository } from "../category.repository.ts";

export class MySQLCategoryRepository
  extends CategoryRepository<DBConnectionMySql> {
  constructor() {
    super(new DBConnectionMySql());
  }

  async getRootCategories(): Promise<Category[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM categories WHERE parentId IS NULL")
      .catch((error) => {
        MySQLCategoryRepository.logError("getRootCategories", error);
        return error;
      });
  }

  async getSubcategories(parentId: string): Promise<Category[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM categories WHERE parentId = ?", [
      parentId,
    ])
      .catch((error) => {
        MySQLCategoryRepository.logError("getSubcategories", error);
        return error;
      });
  }

  async getAll(): Promise<Category[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM categories").catch((error) => {
      MySQLCategoryRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<Category> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM categories WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLCategoryRepository.logError("getById", error);
      return error;
    });
  }

  async create(
    item: Omit<Category, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO categories (id, name, parentId) VALUES (?, ?, ?)",
      [
        id,
        item.name,
        item.parentId,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLCategoryRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<Category, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE categories SET name = ?, parentId = ? WHERE id like ?",
      [
        item.name,
        item.parentId,
        item.id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLCategoryRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM categories WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLCategoryRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-category.repository", methodName, error);
  }
}
