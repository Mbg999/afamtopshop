import { AbstractMigration, ClientMySQL, Info } from "../../deps.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.execute(
      `CREATE TABLE articles(
        id BINARY(16) DEFAULT (UNHEX(REPLACE(UUID(), '-', ''))),
        slug VARCHAR(80) NOT NULL,
        title VARCHAR(80),
        body VARCHAR(2000),
        categoryId BINARY(16) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        CONSTRAINT PK_article PRIMARY KEY (id),
        CONSTRAINT UC_article_slug UNIQUE (slug),
        CONSTRAINT FK_article_category FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE RESTRICT
      )`,
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.execute("DROP TABLE articles");
  }
}
