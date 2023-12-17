import { AbstractMigration, ClientMySQL, Info } from "../../../deps.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    // uuid https://stackoverflow.com/a/46134649
    await this.client.execute(
      `CREATE TABLE products (
        id CHAR(36) DEFAULT (UUID()),
        name VARCHAR(50) NOT NULL,
        description varchar(500),
        categoryId CHAR(36),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        CONSTRAINT PK_product PRIMARY KEY (id),
        CONSTRAINT UC_product_name UNIQUE (name),
        CONSTRAINT FK_product_category FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE RESTRICT
       )`,
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.execute("DROP TABLE products");
  }
}
