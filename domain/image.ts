export interface Image {
  id: string;
  productId: string;
  name: string | null;
  url: string | null;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
}
