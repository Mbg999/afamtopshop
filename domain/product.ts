export interface Product {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
}
