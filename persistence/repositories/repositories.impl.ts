import { MySQLCategoryRepository } from "./mysql/mysql-category.repository.ts";

export const categoryRepositoryImpl = () => new MySQLCategoryRepository();
