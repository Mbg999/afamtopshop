import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { ArticleTag } from "../../../domain/article-tag.ts";
import { DBConnectionMySql } from "../../db-connection-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ArticleTagRepository } from "../article-tag.repository.ts";

export class MySQLArticleTagRepository
  extends ArticleTagRepository<DBConnectionMySql> {
  constructor() {
    super(new DBConnectionMySql());
  }

  async getArticlesFromTagId(tagId: string): Promise<ArticleTag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      "SELECT * FROM article_tag WHERE tagId LIKE ?",
      [tagId],
    ).catch((error) => {
      MySQLArticleTagRepository.logError("getArticlesFromTagId", error);
      return error;
    });
  }

  async getTagsFromArticleId(articleId: string): Promise<ArticleTag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      "SELECT * FROM article_tag WHERE articleId LIKE ?",
      [articleId],
    ).catch((error) => {
      MySQLArticleTagRepository.logError("getTagsFromArticleId", error);
      return error;
    });
  }

  async getAll(): Promise<ArticleTag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM article_tag").catch((error) => {
      MySQLArticleTagRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<ArticleTag> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM article_tag WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLArticleTagRepository.logError("getById", error);
      return error;
    });
  }

  async create(
    item: Omit<ArticleTag, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO article_tag (id, articleId, tagId) VALUES (?, ?, ?)",
      [
        id,
        item.articleId,
        item.tagId,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLArticleTagRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<ArticleTag, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE article_tag SET articleId = ?, tagId = ? WHERE id like ?",
      [
        item.articleId,
        item.tagId,
        item.id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLArticleTagRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM article_tag WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLArticleTagRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-article-tag.repository", methodName, error);
  }
}
