import { AbstractMigration, ClientMySQL, Info } from "../../deps.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.execute(
      `CREATE TABLE shop_product(
        id BINARY(16) DEFAULT (UNHEX(REPLACE(UUID(), '-', ''))),
        shopId BINARY(16) NOT NULL,
        productId BINARY(16) NOT NULL,
        url VARCHAR(300) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        CONSTRAINT PK_shop_product PRIMARY KEY (id),
        CONSTRAINT UC_shop_product UNIQUE (shopId, productId, url),
        CONSTRAINT FK_shop_product_shop FOREIGN KEY (shopId) REFERENCES shops(id) ON DELETE RESTRICT,
        CONSTRAINT FK_shop_product_product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE RESTRICT
      )`,
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.execute("DROP TABLE shop_product");
  }
}
