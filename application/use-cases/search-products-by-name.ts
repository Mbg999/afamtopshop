import { Product } from "./../../domain/product.ts";
import { productRepositoryImpl } from "../../persistence/repositories/repositories.impl.ts";

export class SearchProductsByName {
  constructor(
    private readonly productRepository = productRepositoryImpl(),
  ) {}

  invoke(name: string): Promise<Product[]> {
    return this.productRepository.searchByName(name);
  }
}
