export interface Article {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  body: string | null;
  categoryId: string;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
}
