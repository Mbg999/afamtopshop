export interface ProductTag {
  id: string;
  productId: string;
  tagId: string;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
}
