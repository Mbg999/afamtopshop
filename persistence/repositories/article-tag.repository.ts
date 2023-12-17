import { ArticleTag } from "../../domain/article-tag.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class ArticleTagRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, ArticleTag> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract getArticlesFromTagId(tagId: string): Promise<ArticleTag[]>;

  abstract getTagsFromArticleId(articleId: string): Promise<ArticleTag[]>;
}
