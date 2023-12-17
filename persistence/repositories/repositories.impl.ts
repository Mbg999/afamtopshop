import { MySQLArticleTagRepository } from "./mysql/mysql-article-tag.repository.ts";
import { MySQLArticleRepository } from "./mysql/mysql-article.repository.ts";
import { MySQLCategoryRepository } from "./mysql/mysql-category.repository.ts";
import { MySQLImageRepository } from "./mysql/mysql-image.repository.ts";
import { MySQLProductTagRepository } from "./mysql/mysql-product-tag.repository.ts";
import { MySQLProductRepository } from "./mysql/mysql-product.repository.ts";
import { MySQLShopProductRepository } from "./mysql/mysql-shop-product.repository.ts";
import { MySQLShopRepository } from "./mysql/mysql-shop.repository.ts";
import { MySQLTagRepository } from "./mysql/mysql-tag.repository.ts";

export const categoryRepositoryImpl = () => new MySQLCategoryRepository();
export const shopRepositoryImpl = () => new MySQLShopRepository();
export const tagRepositoryImpl = () => new MySQLTagRepository();
export const productRepositoryImpl = () => new MySQLProductRepository();
export const articleRepositoryImpl = () => new MySQLArticleRepository();
export const imageRepositoryImpl = () => new MySQLImageRepository();
export const articleTagRepositoryImpl = () => new MySQLArticleTagRepository();
export const productTagRepositoryImpl = () => new MySQLProductTagRepository();
export const shopProductRepositoryImpl = () => new MySQLShopProductRepository();
