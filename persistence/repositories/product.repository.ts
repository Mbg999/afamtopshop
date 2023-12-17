import { Product } from "../../domain/product.model.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class ProductRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, Product> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }
}
