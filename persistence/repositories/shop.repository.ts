import { Shop } from "../../domain/shop.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class ShopRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, Shop> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }
}
