import { AbstractMigration, ClientMySQL, Info } from "../../../deps.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    // uuid https://stackoverflow.com/a/46134649
    await this.client.execute(
      `CREATE TABLE categories (
        id CHAR(36) DEFAULT (UUID()),
        name VARCHAR(50) NOT NULL,
        parentId CHAR(36),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        CONSTRAINT PK_category PRIMARY KEY (id),
        CONSTRAINT UC_category_name UNIQUE (name),
        CONSTRAINT FK_category_category FOREIGN KEY (parentId) REFERENCES categories(id) ON DELETE RESTRICT
       )`,
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.execute("DROP TABLE categories");
  }
}
