import { Product } from "../../domain/product.ts";
import { CardVM } from "../view-model/card-vm.ts";

export class CardVmMapper {
  static fromProduct(
    product: Product,
  ): CardVM {
    const card: CardVM = {
      id: product.id,
      title: product.name,
      description: product.description,
      images: product.images?.map((
        i,
      ) => ({
        title: product.name,
        url: i.url ?? (i.name ? `/assets/${i.name}` : "default"), // TODO: completar path y default img
        alt: product.name,
      })) || null,
      urls: product.urls?.map((sp) => ({ shop: sp.shopName, url: sp.url })) ||
        null,
      category: product.categoryName,
      tags: product.tags?.map((t) => t.tagName as string),
    };
    return card;
  }
}
