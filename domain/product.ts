import { ProductTag } from "./product-tag.ts";
import { ShopProduct } from "./shop-product.ts";
import { Image } from "./image.ts";
export interface Product {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
  urls?: ShopProduct[];
  images?: Image[];
  categoryName?: string;
  tags?: ProductTag[];
}
