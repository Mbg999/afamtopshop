import { Article } from "../../domain/article.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class ArticleRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, Article> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }
}
