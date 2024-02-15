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
  ): Promise<Product[]>;
}
