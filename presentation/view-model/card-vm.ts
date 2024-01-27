import { ImageVM } from "./image.ts";
import { ShopUrl } from "./shop-url.ts";

export interface CardVM {
  id: string;
  title: string;
  description: string | null;
  images: ImageVM[] | null;
  urls: ShopUrl[] | null;
  category?: string;
  tags?: string[];
}
