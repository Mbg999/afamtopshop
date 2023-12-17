import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { ShopProduct } from "../../../domain/shop-product.model.ts";
import { DBMySql } from "./db-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ShopProductRepository } from "../shop-product.repository.ts";

export class MySQLShopProductRepository
  extends ShopProductRepository<DBMySql> {
  constructor() {
    super(new DBMySql());
  }

  async getShopsFromProductId(productId: string): Promise<ShopProduct[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      "SELECT * FROM shop_product WHERE productId LIKE ?",
      [productId],
    ).catch((error) => {
      MySQLShopProductRepository.logError("getShopsFromProductId", error);
      return error;
    });
  }

  async getProductsFromShopId(shopId: string): Promise<ShopProduct[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      "SELECT * FROM shop_product WHERE shopId LIKE ?",
      [shopId],
    ).catch((error) => {
      MySQLShopProductRepository.logError("getProductsFromShopId", error);
      return error;
    });
  }

  async getAll(): Promise<ShopProduct[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM shop_product").catch((error) => {
      MySQLShopProductRepository.logError("getAll", error);
      return error;
    });
  }

  async getById(id: string): Promise<ShopProduct> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query("SELECT * FROM shop_product WHERE id LIKE ?", [
      id,
    ]).catch((error) => {
      MySQLShopProductRepository.logError("getById", error);
      return error;
    });
  }

  async create(
    item: Omit<ShopProduct, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem> {
    const conn = await this.dbConnection.getConnection();
    const id = await generateUUIDV5();
    return await conn.execute(
      "INSERT INTO shop_product (id, shopId, productId, url) VALUES (?, ?, ?, ?)",
      [
        id,
        item.shopId,
        item.productId,
        item.url,
      ],
    ).then((r) => r.affectedRows ? { id } : null).catch((error) => {
      MySQLShopProductRepository.logError("create", error);
      return error;
    });
  }

  async update(
    item: Omit<ShopProduct, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "UPDATE shop_product SET shopId = ?, productId = ?, url = ? WHERE id like ?",
      [
        item.shopId,
        item.productId,
        item.id,
        item.url,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLShopProductRepository.logError("update", error);
      return error;
    });
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.dbConnection.getConnection();
    return await conn.execute(
      "DELETE FROM shop_product WHERE id like ?",
      [
        id,
      ],
    ).then((r) => !!r?.affectedRows).catch((error) => {
      MySQLShopProductRepository.logError("delete", error);
      return error;
    });
  }

  private static logError(methodName: string, error: any): void {
    Log.error("mysql/mysql-shop-product.repository", methodName, error);
  }
}
