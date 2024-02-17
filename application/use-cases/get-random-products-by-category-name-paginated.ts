import { Product } from "../../domain/product.ts";
import { productRepositoryImpl } from "../../persistence/repositories/repositories.impl.ts";

export class GetRandomProductsByCategoryNamePaginated {
  constructor(
    private readonly productRepository = productRepositoryImpl(),
  ) {}

  invoke(
    categoryName: string,
    offset = 0,
    limit = 10,
    excludedIds?: string[],
  ): Promise<Product[]> {
    return this.productRepository.getRandomProductsByCategoryNamePaginated(
      categoryName,
      offset,
      limit,
      excludedIds,
    );
  }
}
