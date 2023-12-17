import { Category } from "../../domain/category.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class CategoryRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, Category> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract getRootCategories(): Promise<Category[]>;

  abstract getSubcategories(parentId: string): Promise<Category[]>;
}
