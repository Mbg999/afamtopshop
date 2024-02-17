import { Product } from "../../domain/product.ts";
import { productRepositoryImpl } from "../../persistence/repositories/repositories.impl.ts";

export class GetProductsByCategoryNamePaginated {
  constructor(
    private readonly productRepository = productRepositoryImpl(),
  ) {}

  invoke(
    categoryName: string,
    offset = 0,
    limit = 10,
    excludedIds?: string[],
  ): Promise<Product[]> {
    return this.productRepository.getProductsByCategoryNamePaginated(
      categoryName,
      offset,
      limit,
      excludedIds,
    );
  }
}
