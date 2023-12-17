import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { Tag } from "../../../domain/tag.ts";
import { DBConnectionMySql } from "../../db-connection-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { TagRepository } from "../tag.repository.ts";

export class MySQLTagRepository extends TagRepository<DBConnectionMySql> {
  constructor() {
    super(new DBConnectionMySql());
  }

  async getAll(): Promise<Tag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM tags").catch((error) => {
      MySQLTagRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<Tag> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM tags WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLTagRepository.logError("getById", error);
      return error;
    });
  }

  async getTagsFromIdList(ids: string[]): Promise<Tag[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      `SELECT * FROM tags WHERE id IN (${
        ids.map((id) => "'" + id + "'").join(", ")
      })`,
    ).catch((error) => {
      MySQLTagRepository.logError("getAll", error);
      return error;
    });
  }

  async create(
    item: Omit<Tag, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO tags (id, name) VALUES (?, ?)",
      [
        id,
        item.name,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLTagRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<Tag, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE tags SET name = ? WHERE id like ?",
      [
        item.name,
        item.id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLTagRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM tags WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLTagRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-tag.repository", methodName, error);
  }
}
