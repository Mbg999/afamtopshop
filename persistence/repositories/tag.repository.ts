import { Tag } from "../../domain/tag.ts";
import { BaseRepository } from "./base.repository.ts";

export abstract class TagRepository<DBConnectionT>
  extends BaseRepository<DBConnectionT, Tag> {
  constructor(dbConnection: DBConnectionT) {
    super(dbConnection);
  }

  abstract getTagsFromIdList(ids: string[]): Promise<Tag[]>;
}
