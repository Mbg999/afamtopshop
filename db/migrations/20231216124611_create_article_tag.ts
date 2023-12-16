import { AbstractMigration, ClientMySQL, Info } from "../../deps.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.execute(
      `CREATE TABLE article_tag(
        id BINARY(16) DEFAULT (UNHEX(REPLACE(UUID(), '-', ''))),
        articleId BINARY(16) NOT NULL,
        tagId BINARY(16) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        CONSTRAINT PK_article_tag PRIMARY KEY (id),
        CONSTRAINT UC_article_tag UNIQUE (articleId, tagId),
        CONSTRAINT FK_article_tag_article FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE RESTRICT,
        CONSTRAINT FK_article_tag_tag FOREIGN KEY (tagId) REFERENCES tags(id) ON DELETE RESTRICT
      )`,
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.execute("DROP TABLE article_tag");
  }
}
