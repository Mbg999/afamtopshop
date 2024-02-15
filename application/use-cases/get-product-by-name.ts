import { Product } from "../../domain/product.ts";
import { productRepositoryImpl } from "../../persistence/repositories/repositories.impl.ts";

export class GetProductByName {
  constructor(
    private readonly productRepository = productRepositoryImpl(),
  ) {}

  invoke(name: string): Promise<Product | undefined> {
    return this.productRepository.getByName(name);
  }
}
