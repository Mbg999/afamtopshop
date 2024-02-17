import { Product } from "../../domain/product.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class ProductRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, Product> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract searchByName(name: string): Promise<Product[]>;

  abstract getByName(name: string): Promise<Product | undefined>;

  abstract getLatestPaginated(
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]>;

  abstract getRandomPaginated(
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]>;

  abstract getProductsByCategoryNamePaginated(
    categoryId: string,
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]>;

  abstract getRandomProductsByCategoryNamePaginated(
    categoryId: string,
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]>;

  abstract getProductsByTagNamePaginated(
    tagId: string,
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]>;

  abstract getRandomProductsByTagNamePaginated(
    tagId: string,
    offset: number,
    limit: number,
    excludedIds?: string[],
  ): Promise<Product[]>;
}
