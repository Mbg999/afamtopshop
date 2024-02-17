import { ProductTag } from "./../../../domain/product-tag.ts";
import { productTagRepositoryImpl } from "./../repositories.impl.ts";
import { ShopProduct } from "./../../../domain/shop-product.ts";
import { Log } from "../../../utils/log.utils.ts";
import { generateUUIDV5 } from "../../../utils/uuid.utils.ts";
import { Product } from "../../../domain/product.ts";
import { DBMySql } from "./db-mysql.ts";
import { createdItem } from "../base.repository.ts";
import { ProductRepository } from "../product.repository.ts";
import {
  imageRepositoryImpl,
  shopProductRepositoryImpl,
} from "../repositories.impl.ts";
import { Image } from "../../../domain/image.ts";
import { excludeIds } from "./utils.ts";

export class MySQLProductRepository extends ProductRepository<DBMySql> {
  constructor() {
    super(new DBMySql());
  }

  async getLatestPaginated(
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    const products: Product[] = await conn.query(
      `SELECT p.*, c.name as categoryName FROM products p JOIN categories c ON c.id LIKE p.categoryId${
        excludeIds("p.id", false, excludedIds)
      }ORDER BY createdAt DESC LIMIT ?, ?`,
      [
        ...(excludedIds ?? []),
        offset,
        limit,
      ],
    ).catch((error) => {
      MySQLProductRepository.logError("getLatestPaginated", error);
      throw error;
    });

    if (products.length < 1) {
      return products;
    }

    const productIds = products.map((p) => p.id);

    const imageRepository = imageRepositoryImpl();
    const images: Image[] = await imageRepository.getAllFromMultipleProducts(
      productIds,
    );

    const shopProductRepository = shopProductRepositoryImpl();
    const urls: ShopProduct[] = await shopProductRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    const productTagRepository = productTagRepositoryImpl();
    const tags: ProductTag[] = await productTagRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    products.forEach((p) => {
      p.images = images.filter((i) => i.productId == p.id);
      p.urls = urls.filter((u) => u.productId == p.id);
      p.tags = tags.filter((t) => t.productId == p.id);
    });

    return products;
  }

  async getRandomPaginated(
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    const products: Product[] = await conn.query(
      `SELECT p.*, c.name as categoryName FROM products p JOIN categories c ON c.id LIKE p.categoryId${
        excludeIds("p.id", false, excludedIds)
      }ORDER BY RAND() DESC LIMIT ?, ?`,
      [
        ...(excludedIds ?? []),
        offset,
        limit,
      ],
    ).catch((error) => {
      MySQLProductRepository.logError("getLatestPaginated", error);
      throw error;
    });

    if (products.length < 1) {
      return products;
    }

    const productIds = products.map((p) => p.id);

    const imageRepository = imageRepositoryImpl();
    const images: Image[] = await imageRepository.getAllFromMultipleProducts(
      productIds,
    );

    const shopProductRepository = shopProductRepositoryImpl();
    const urls: ShopProduct[] = await shopProductRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    const productTagRepository = productTagRepositoryImpl();
    const tags: ProductTag[] = await productTagRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    products.forEach((p) => {
      p.images = images.filter((i) => i.productId == p.id);
      p.urls = urls.filter((u) => u.productId == p.id);
      p.tags = tags.filter((t) => t.productId == p.id);
    });

    return products;
  }

  async getProductsByCategoryNamePaginated(
    categoryName: string,
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    const products: Product[] = await conn.query(
      `SELECT p.*, c.name as categoryName FROM products p JOIN categories c ON c.id LIKE p.categoryId WHERE c.name LIKE ?${
        excludeIds("p.id", true, excludedIds)
      }ORDER BY createdAt DESC LIMIT ?, ?`,
      [
        categoryName,
        ...(excludedIds ?? []),
        offset,
        limit,
      ],
    ).catch((error) => {
      MySQLProductRepository.logError(
        "getProductsByCategoryNamePaginated",
        error,
      );
      throw error;
    });

    if (products.length < 1) {
      return products;
    }

    const productIds = products.map((p) => p.id);

    const imageRepository = imageRepositoryImpl();
    const images: Image[] = await imageRepository.getAllFromMultipleProducts(
      productIds,
    );

    const shopProductRepository = shopProductRepositoryImpl();
    const urls: ShopProduct[] = await shopProductRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    const productTagRepository = productTagRepositoryImpl();
    const tags: ProductTag[] = await productTagRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    products.forEach((p) => {
      p.images = images.filter((i) => i.productId == p.id);
      p.urls = urls.filter((u) => u.productId == p.id);
      p.tags = tags.filter((t) => t.productId == p.id);
    });

    return products;
  }

  async getRandomProductsByCategoryNamePaginated(
    categoryName: string,
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    const products: Product[] = await conn.query(
      `SELECT p.*, c.name as categoryName FROM products p JOIN categories c ON c.id LIKE p.categoryId WHERE c.name LIKE ?${
        excludeIds("p.id", true, excludedIds)
      }ORDER BY RAND() DESC LIMIT ?, ?`,
      [
        categoryName,
        ...(excludedIds ?? []),
        offset,
        limit,
      ],
    ).catch((error) => {
      MySQLProductRepository.logError(
        "getRandomProductsByCategoryNamePaginated",
        error,
      );
      throw error;
    });

    if (products.length < 1) {
      return products;
    }

    const productIds = products.map((p) => p.id);
    const imageRepository = imageRepositoryImpl();
    const images: Image[] = await imageRepository.getAllFromMultipleProducts(
      productIds,
    );

    const shopProductRepository = shopProductRepositoryImpl();
    const urls: ShopProduct[] = await shopProductRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    const productTagRepository = productTagRepositoryImpl();
    const tags: ProductTag[] = await productTagRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    products.forEach((p) => {
      p.images = images.filter((i) => i.productId == p.id);
      p.urls = urls.filter((u) => u.productId == p.id);
      p.tags = tags.filter((t) => t.productId == p.id);
    });

    return products;
  }

  async getProductsByTagNamePaginated(
    tagName: string,
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    const products: Product[] = await conn.query(
      `SELECT p.*, c.name as categoryName FROM products p JOIN categories c ON c.id LIKE p.categoryId JOIN product_tag pt ON pt.productId LIKE p.id JOIN tags t ON t.id LIKE pt.tagId WHERE t.name LIKE ?${
        excludeIds("p.id", true, excludedIds)
      }ORDER BY p.createdAt DESC LIMIT ?, ?`,
      [
        tagName,
        ...(excludedIds ?? []),
        offset,
        limit,
      ],
    ).catch((error) => {
      MySQLProductRepository.logError("getProductsByTagNamePaginated", error);
      throw error;
    });

    if (products.length < 1) {
      return products;
    }

    const productIds = products.map((p) => p.id);

    const imageRepository = imageRepositoryImpl();
    const images: Image[] = await imageRepository.getAllFromMultipleProducts(
      productIds,
    );

    const shopProductRepository = shopProductRepositoryImpl();
    const urls: ShopProduct[] = await shopProductRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    const productTagRepository = productTagRepositoryImpl();
    const tags: ProductTag[] = await productTagRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    products.forEach((p) => {
      p.images = images.filter((i) => i.productId == p.id);
      p.urls = urls.filter((u) => u.productId == p.id);
      p.tags = tags.filter((t) => t.productId == p.id);
    });

    return products;
  }

  async getRandomProductsByTagNamePaginated(
    tagName: string,
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    const products: Product[] = await conn.query(
      `SELECT p.*, c.name as categoryName FROM products p JOIN categories c ON c.id LIKE p.categoryId JOIN product_tag pt ON pt.productId LIKE p.id JOIN tags t ON t.id LIKE pt.tagId WHERE t.name LIKE ?${
        excludeIds("p.id", true, excludedIds)
      }ORDER BY RAND() DESC LIMIT ?, ?`,
      [
        tagName,
        ...(excludedIds ?? []),
        offset,
        limit,
      ],
    ).catch((error) => {
      MySQLProductRepository.logError(
        "getRandomProductsByTagNamePaginated",
        error,
      );
      throw error;
    });

    if (products.length < 1) {
      return products;
    }

    const productIds = products.map((p) => p.id);

    const imageRepository = imageRepositoryImpl();
    const images: Image[] = await imageRepository.getAllFromMultipleProducts(
      productIds,
    );

    const shopProductRepository = shopProductRepositoryImpl();
    const urls: ShopProduct[] = await shopProductRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    const productTagRepository = productTagRepositoryImpl();
    const tags: ProductTag[] = await productTagRepository
      .getAllFromMultipleProducts(
        productIds,
      );

    products.forEach((p) => {
      p.images = images.filter((i) => i.productId == p.id);
      p.urls = urls.filter((u) => u.productId == p.id);
      p.tags = tags.filter((t) => t.productId == p.id);
    });

    return products;
  }

  async searchByName(name: string): Promise<Product[]> {
    const conn = await this.dbConnection.getConnection();
    return await conn.query(
      "SELECT * FROM products WHERE name LIKE ? LIMIT 0, 10",
      [
        `%${name}%`,
      ],
    ).catch((error) => {
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

  async getByName(name: string): Promise<Product | undefined> {
    const conn = await this.dbConnection.getConnection();
    const product: Product = await conn.query(
      "SELECT p.*, c.name as categoryName FROM products p JOIN categories c ON c.id LIKE p.categoryId WHERE p.name LIKE ?",
      [
        name,
      ],
    ).then((r: Product[]) => r?.length > 0 ? r[0] : undefined).catch(
      (error) => {
        MySQLProductRepository.logError("getByName", error);
        return error;
      },
    );

    const imageRepository = imageRepositoryImpl();
    product.images = await imageRepository.getImagesFromAProduct(
      product.id,
    );

    const shopProductRepository = shopProductRepositoryImpl();
    product.urls = await shopProductRepository
      .getShopsFromProductId(
        product.id,
      );

    const productTagRepository = productTagRepositoryImpl();
    product.tags = await productTagRepository
      .getTagsFromProductId(
        product.id,
      );

    return product;
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
