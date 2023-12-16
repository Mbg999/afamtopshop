import { AbstractMigration, ClientMySQL, Info } from "../../deps.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    // uuid https://stackoverflow.com/a/46134649
    await this.client.execute(
      `CREATE TABLE tags (
        id BINARY(16) DEFAULT (UNHEX(REPLACE(UUID(), '-', ''))),
        name VARCHAR(50) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        CONSTRAINT PK_tag PRIMARY KEY (id),
        CONSTRAINT UC_tag_name UNIQUE (name)
       )`,
    );
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.execute("DROP TABLE tags");
  }
}
