export interface ShopProduct {
  id: string;
  shopId: string;
  productId: string;
  url: string;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
}
