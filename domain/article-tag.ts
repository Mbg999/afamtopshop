export interface ArticleTag {
  id: string;
  articleId: string;
  tagId: string;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
}
