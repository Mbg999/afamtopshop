import { Image } from "../../domain/image.model.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class ImageRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, Image> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract getImagesFromAProduct(productId: string): Promise<Image[]>;
}
