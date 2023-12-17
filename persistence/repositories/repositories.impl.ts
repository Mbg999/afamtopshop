import { MySQLArticleTagRepository } from "./mysql/mysql-article-tag.repository.ts";
import { MySQLArticleRepository } from "./mysql/mysql-article.repository.ts";
import { MySQLCategoryRepository } from "./mysql/mysql-category.repository.ts";
import { MySQLImageRepository } from "./mysql/mysql-image.repository.ts";
import { MySQLProductRepository } from "./mysql/mysql-product.repository.ts";
import { MySQLShopRepository } from "./mysql/mysql-shop.repository.ts";
import { MySQLTagRepository } from "./mysql/mysql-tag.repository.ts";

export const categoryRepositoryImpl = () => new MySQLCategoryRepository();
export const shopRepositoryImpl = () => new MySQLShopRepository();
export const tagRepositoryImpl = () => new MySQLTagRepository();
export const productRepositoryImpl = () => new MySQLProductRepository();
export const articleRepositoryImpl = () => new MySQLArticleRepository();
export const imageRepositoryImpl = () => new MySQLImageRepository();
export const articleTagRepositoryImpl = () => new MySQLArticleTagRepository();
