import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { Article } from "../../../domain/article.ts";
import { DBMySql } from "./db-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ArticleRepository } from "../article.repository.ts";

export class MySQLArticleRepository
  extends ArticleRepository<DBMySql> {
  constructor() {
    super(new DBMySql());
  }

  async getAll(): Promise<Article[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM articles").catch((error) => {
      MySQLArticleRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<Article> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM articles WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLArticleRepository.logError("getById", error);
      return error;
    });
  }

  async create(
    item: Omit<Article, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO articles (id, slug, title, body, categoryId) VALUES (?, ?, ?, ?, ?)",
      [
        id,
        item.slug,
        item.title,
        item.body,
        item.categoryId,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLArticleRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<Article, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE articles SET slug = ?, title = ?, body = ?, categoryId = ? WHERE id like ?",
      [
        item.slug,
        item.title,
        item.body,
        item.categoryId,
        item.id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLArticleRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM articles WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLArticleRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-article.repository", methodName, error);
  }
}
