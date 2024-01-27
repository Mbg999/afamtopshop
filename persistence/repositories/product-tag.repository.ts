import { ProductTag } from "../../domain/product-tag.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class ProductTagRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, ProductTag> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract getProductsFromTagId(tagId: string): Promise<ProductTag[]>;
  abstract getTagsFromProductId(productId: string): Promise<ProductTag[]>;
  abstract getAllFromMultipleProducts(productIds: string[]): Promise<ProductTag[]>;
}
