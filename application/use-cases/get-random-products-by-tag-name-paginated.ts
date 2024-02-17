import { Product } from "../../domain/product.ts";
import { productRepositoryImpl } from "../../persistence/repositories/repositories.impl.ts";

export class GetRandomProductsByTagNamePaginated {
  constructor(
    private readonly productRepository = productRepositoryImpl(),
  ) {}

  invoke(
    tagName: string,
    offset = 0,
    limit = 10,
    excludedIds?: string[],
  ): Promise<Product[]> {
    return this.productRepository.getRandomProductsByTagNamePaginated(
      tagName,
      offset,
      limit,
      excludedIds,
    );
  }
}
