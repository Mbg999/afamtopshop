import { Category } from "../../domain/category.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class CategoryRepository<DBConnectionT, T>
  extends BaseRepository<DBConnectionT, T> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract getRootCategories(): Promise<Category[]>;

  abstract getSubcategories(parentId: string): Promise<Category[]>;
}
