import { Image } from "../../domain/image.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class ImageRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, Image> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract getImagesFromAProduct(productId: string): Promise<Image[]>;
  abstract getAllFromMultipleProducts(productIds: string[]): Promise<Image[]>;
}
