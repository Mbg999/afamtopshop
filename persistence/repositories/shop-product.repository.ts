import { ShopProduct } from "./../../domain/shop-product";
import { BaseRepository } from "./base.repository.ts";

export abstract class ShopProductRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, ShopProduct> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract getShopsFromProductId(productId: string): Promise<ShopProduct[]>;

  abstract getProductsFromShopId(shopId: string): Promise<ShopProduct[]>;
}
