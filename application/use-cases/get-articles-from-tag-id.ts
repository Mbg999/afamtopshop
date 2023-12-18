import { ArticleTag } from "../../domain/article-tag.ts";
import { articleTagRepositoryImpl } from "../../persistence/repositories/repositories.impl.ts";

export class GetArticlesFromTagId {
  constructor(
    private readonly articleTagRepository = articleTagRepositoryImpl(),
  ) {}

  invoke(tagId: string): Promise<ArticleTag[]> {
    return this.articleTagRepository.getArticlesFromTagId(tagId);
  }
}
