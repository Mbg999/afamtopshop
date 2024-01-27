import { Product } from "../../domain/product.ts";
import { productRepositoryImpl } from "../../persistence/repositories/repositories.impl.ts";

export class GetLatestProductsPaginated {
  constructor(
    private readonly productRepository = productRepositoryImpl(),
  ) {}

  invoke(offset: number, limit = 10): Promise<Product[]> {
    return this.productRepository.getLatestPaginated(offset, limit);
  }
}
