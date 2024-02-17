import { Product } from "../../domain/product.ts";
import { productRepositoryImpl } from "../../persistence/repositories/repositories.impl.ts";

export class GetRandomProductsPaginated {
  constructor(
    private readonly productRepository = productRepositoryImpl(),
  ) {}

  invoke(
    offset: number,
    limit = 10,
    excludedIds?: string[],
  ): Promise<Product[]> {
    return this.productRepository.getRandomPaginated(
      offset,
      limit,
      excludedIds,
    );
  }
}
