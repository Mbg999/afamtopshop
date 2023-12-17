import { AbstractMigration, ClientMySQL, Info } from "../../../deps.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.execute(
      `CREATE TABLE images(
        id CHAR(36) DEFAULT (UUID()),
        productId CHAR(36) NOT NULL,
        name VARCHAR(50),
        url VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        CONSTRAINT PK_image PRIMARY KEY (id),
        CONSTRAINT UC_image_name UNIQUE (productId, name),
        CONSTRAINT UC_image_url UNIQUE (productId, url),
        CONSTRAINT FK_image_product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE RESTRICT
      )`,
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.execute("DROP TABLE images");
  }
}
