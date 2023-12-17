import { MySQLCategoryRepository } from "./mysql/mysql-category.repository.ts";
import { MySQLShopRepository } from "./mysql/mysql-shop.repository.ts";

export const categoryRepositoryImpl = () => new MySQLCategoryRepository();
export const shopRepositoryImpl = () => new MySQLShopRepository();
