import { Client, ClientConfig } from "../../deps.ts";
import { ArticleTagRepository } from "./article-tag.repository.ts";
import { ArticleRepository } from "./article.repository.ts";
import { CategoryRepository } from "./category.repository.ts";
import { DBBase } from "./db-base.ts";
import { ImageRepository } from "./image.repository.ts";
import { DBMySql } from "./mysql/db-mysql.ts";
import { MySQLArticleTagRepository } from "./mysql/mysql-article-tag.repository.ts";
import { MySQLArticleRepository } from "./mysql/mysql-article.repository.ts";
import { MySQLCategoryRepository } from "./mysql/mysql-category.repository.ts";
import { MySQLImageRepository } from "./mysql/mysql-image.repository.ts";
import { MySQLProductTagRepository } from "./mysql/mysql-product-tag.repository.ts";
import { MySQLProductRepository } from "./mysql/mysql-product.repository.ts";
import { MySQLShopProductRepository } from "./mysql/mysql-shop-product.repository.ts";
import { MySQLShopRepository } from "./mysql/mysql-shop.repository.ts";
import { MySQLTagRepository } from "./mysql/mysql-tag.repository.ts";
import { ProductTagRepository } from "./product-tag.repository.ts";
import { ProductRepository } from "./product.repository.ts";
import { ShopProductRepository } from "./shop-product.repository.ts";
import { ShopRepository } from "./shop.repository.ts";
import { TagRepository } from "./tag.repository.ts";

type DBType = DBMySql;

export const dbImpl: () => DBBase<Client, ClientConfig> = () => new DBMySql();
export const categoryRepositoryImpl: () => CategoryRepository<DBType> = () =>
  new MySQLCategoryRepository();
export const shopRepositoryImpl: () => ShopRepository<DBType> = () =>
  new MySQLShopRepository();
export const tagRepositoryImpl: () => TagRepository<DBType> = () =>
  new MySQLTagRepository();
export const productRepositoryImpl: () => ProductRepository<DBType> = () =>
  new MySQLProductRepository();
export const articleRepositoryImpl: () => ArticleRepository<DBType> = () =>
  new MySQLArticleRepository();
export const imageRepositoryImpl: () => ImageRepository<DBType> = () =>
  new MySQLImageRepository();
export const articleTagRepositoryImpl: () => ArticleTagRepository<DBType> =
  () => new MySQLArticleTagRepository();
export const productTagRepositoryImpl: () => ProductTagRepository<DBType> =
  () => new MySQLProductTagRepository();
export const shopProductRepositoryImpl: () => ShopProductRepository<DBType> =
  () => new MySQLShopProductRepository();
