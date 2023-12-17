import { AbstractMigration, ClientMySQL, Info } from "../../../deps.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.execute(
      `CREATE TABLE product_tag(
        id CHAR(36) DEFAULT (UUID()),
        productId CHAR(36) NOT NULL,
        tagId CHAR(36) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        CONSTRAINT PK_product_tag PRIMARY KEY (id),
        CONSTRAINT UC_product_tag UNIQUE (productId, tagId),
        CONSTRAINT FK_product_tag_product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE RESTRICT,
        CONSTRAINT FK_product_tag_tag FOREIGN KEY (tagId) REFERENCES tags(id) ON DELETE RESTRICT
      )`,
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.execute("DROP TABLE product_tag");
  }
}
