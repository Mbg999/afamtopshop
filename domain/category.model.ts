export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
}
